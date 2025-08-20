import { createRequiredContext } from '@/common/utils';

export interface IRGBPixel {
  r: number;
  g: number;
  b: number;
}

export type TPallete = IRGBPixel[];

export interface IColorSchemeContext {
  isLoadingPallete: boolean;
  pallete: TPallete;
  updateBase64Image: (base64Image: string | ArrayBuffer | null) => void;
}

const [useColorSchemeContext, Provider] =
  createRequiredContext<IColorSchemeContext>({
    isLoadingPallete: false,
    pallete: [],
    updateBase64Image: () => {},
  });

export { Provider, useColorSchemeContext };
