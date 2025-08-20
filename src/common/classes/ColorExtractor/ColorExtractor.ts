import { IRGBPixel } from '@/common/contexts/ColorScheme/ColorSchemeContext';

import { IColorExtractionStrategy } from './ColorExtractionStrategy';
import { MedianCut } from './MedianCut';

function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') throw new Error('Not a string');
}

export class ColorExtractor {
  private strategy: IColorExtractionStrategy = new MedianCut();

  constructor() {}

  public setStrategy(strategy: IColorExtractionStrategy) {
    this.strategy = strategy;
  }

  public async drawImage(
    ctx: OffscreenCanvasRenderingContext2D,
    base64Image: string | ArrayBuffer | null
  ) {
    assertIsString(base64Image);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const img = new Image();
    img.src = base64Image;

    const loadImage = new Promise<void>((resolve) => {
      img.onload = () => {
        ctx.canvas.height = img.height;
        ctx.canvas.width = img.width;

        ctx.drawImage(img, 0, 0, img.width, img.height);
        resolve();
      };
    });

    await loadImage;
  }

  public getImageRGBPixels(
    ctx: OffscreenCanvasRenderingContext2D
  ): IRGBPixel[] {
    const imageData = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );

    const rgbValues: IRGBPixel[] = [];

    for (let i = 0; i < imageData.data.length; i += 4) {
      const rgb = {
        r: imageData.data[i],
        g: imageData.data[i + 1],
        b: imageData.data[i + 2],
      };
      rgbValues.push(rgb);
    }

    return rgbValues;
  }

  public quantiziseColors(rgbValues: IRGBPixel[], ...args: unknown[]) {
    return this.strategy.extract(rgbValues, ...args);
  }
}
