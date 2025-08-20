import {
  IRGBPixel,
  TPallete,
} from '@/common/contexts/ColorScheme/ColorSchemeContext.ts';

import type { IColorExtractionStrategy } from './ColorExtractionStrategy.ts';

export class MedianCut implements IColorExtractionStrategy {
  private findBiggestColorRange(
    rgbValues: { r: number; g: number; b: number }[]
  ) {
    let rMin = Number.MAX_VALUE;
    let gMin = Number.MAX_VALUE;
    let bMin = Number.MAX_VALUE;

    let rMax = Number.MIN_VALUE;
    let gMax = Number.MIN_VALUE;
    let bMax = Number.MIN_VALUE;

    rgbValues.forEach((pixel) => {
      rMin = Math.min(rMin, pixel.r);
      gMin = Math.min(gMin, pixel.g);
      bMin = Math.min(bMin, pixel.b);

      rMax = Math.max(rMax, pixel.r);
      gMax = Math.max(gMax, pixel.g);
      bMax = Math.max(bMax, pixel.b);
    });

    const rRange = rMax - rMin;
    const gRange = gMax - gMin;
    const bRanbe = bMax - bMin;

    const biggestRange = Math.max(rRange, gRange, bRanbe);

    if (biggestRange === rRange) {
      return 'r';
    } else if (biggestRange === gRange) {
      return 'g';
    } else {
      return 'b';
    }
  }

  public extract(rgbValues: IRGBPixel[], depth: number): TPallete {
    const MAX_DEPTH = 4;
    if (depth === MAX_DEPTH || rgbValues.length === 0) {
      const color = rgbValues.reduce(
        (prev, curr) => {
          prev.r += curr.r;
          prev.g += curr.g;
          prev.b += curr.b;

          return prev;
        },
        {
          r: 0,
          g: 0,
          b: 0,
        }
      );

      color.r = Math.round(color.r / rgbValues.length);
      color.g = Math.round(color.g / rgbValues.length);
      color.b = Math.round(color.b / rgbValues.length);

      return [color];
    }

    const componentsToSortBy = this.findBiggestColorRange(rgbValues);

    rgbValues.sort((p1, p2) => {
      return p1[componentsToSortBy] - p2[componentsToSortBy];
    });

    const mid = rgbValues.length / 2;

    return [
      ...this.extract(rgbValues.slice(0, mid), depth + 1),
      ...this.extract(rgbValues.slice(mid + 1), depth + 1),
    ];
  }
}
