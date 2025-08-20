import {
  IRGBPixel,
  TPallete,
} from '@/common/contexts/ColorScheme/ColorSchemeContext';

export interface IColorExtractionStrategy {
  extract(data: IRGBPixel[], ...args: unknown[]): TPallete;
}
