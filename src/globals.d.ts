/* eslint-disable @typescript-eslint/naming-convention */
import type { Object3DNode } from '@react-three/fiber';
import type { ShaderMaterial, Texture } from 'three';

type ImageFadeMaterialProps = Object3DNode<
  ShaderMaterial,
  typeof ShaderMaterial
> & {
  tex?: Texture;
  tex2?: Texture;
  disp?: Texture;
  effectFactor?: number;
  dispFactor?: number;
};

declare module '@react-three/fiber' {
  interface ThreeElements {
    imageFadeMaterial: ImageFadeMaterialProps;
  }
}

export {};
