import { shaderMaterial } from '@react-three/drei';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export const FragmentShaderMaterial = shaderMaterial(
  {
    u_resolution: new THREE.Vector2(),
  },
  /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,
  /* glsl */ `
  precision mediump float;

  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  varying vec2 vUv;

  float plot(vec2 st, float pct) {
    return smoothstep(pct-0.02, pct, st.y) - smoothstep(pct, pct+0.02, st.y);
  }

  void main() {
    vec2 st = vUv;

    float y = pow(st.x, 2.0);

    vec3 color = vec3(y);

    float pct = plot(st, y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
  }
`
);

extend({ FragmentShaderMaterial });

const ShaderContent = () => {
  const ref = useRef<THREE.ShaderMaterial & { u_time: number }>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.u_time = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />

      <fragmentShaderMaterial ref={ref} u_resolution={[550, 550]} transparent />
    </mesh>
  );
};

export const Shader = () => {
  return (
    <Canvas camera={{ position: [0, 0, 1.5] }}>
      <ShaderContent />
    </Canvas>
  );
};
