import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { FadingImageDisplacement } from './components/FadingImageDisplacement';

export const HoverTransition = () => {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 7] }}>
        <OrbitControls />
        <FadingImageDisplacement />
      </Canvas>
    </div>
  );
};
