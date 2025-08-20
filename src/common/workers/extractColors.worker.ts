import { ColorExtractor } from '../classes/ColorExtractor/ColorExtractor';
import { IRGBPixel } from '../contexts/ColorScheme/ColorSchemeContext';

const extractor = new ColorExtractor();

self.onmessage = async (e: MessageEvent<string>) => {
  const base64Image = e.data;

  // Process Image
  const imageData: ImageData = await processBase64Image(base64Image);

  // Get RGB Pixels
  const rgbPixels: IRGBPixel[] = imageDataToRGBPixels(imageData);

  const pallete = extractor.quantiziseColors(rgbPixels, 0);

  self.postMessage(pallete);
};

async function processBase64Image(base64Image: string) {
  const response = await fetch(base64Image);
  const blob = await response.blob();

  const imageBitmap = await createImageBitmap(blob);

  const canvasWidth = imageBitmap.width;
  const canvasHeight = imageBitmap.height;

  const canvas = new OffscreenCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Canvas context is not ready');

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(imageBitmap, 0, 0, canvasWidth, canvasHeight);

  imageBitmap.close();

  const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

  return imageData;
}

function imageDataToRGBPixels(imageData: ImageData) {
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

export {};
