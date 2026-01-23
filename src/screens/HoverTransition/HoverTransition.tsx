import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { FadingImageDisplacement } from './components/FadingImageDisplacement';

export const HoverTransition = () => {
  return (
    <div className="h-full w-full rounded-sm border-2 border-red-300">
      <Canvas>
        <OrbitControls />
        <FadingImageDisplacement />
      </Canvas>
    </div>
  );
};
