import gsap from 'gsap';

import { useMenuStore } from '@/store/client';

import type { IPath } from '.';
import { PATHS } from '.';

export const getPathIndex = (path: string) => {
  const index = Object.values(PATHS).findIndex((p) => p.path === path);
  return index;
};

export const gsapLoader = (toPath: IPath, fromPath: string) => {
  const fromIndex = getPathIndex(fromPath);
  const toIndex = getPathIndex(toPath.path);

  const direction = fromIndex < toIndex ? -1 : 1;

  useMenuStore.getState().close();
  const timeline = gsap.timeline({
    defaults: {
      duration: 0.5,
      ease: 'back.out',
    },
  });

  timeline
    .to('.main-content', { scale: 0.5 })
    .to('.main-content', {
      y: window.innerHeight * direction,
    })
    .to('.main-content', {
      scale: 1,
    });

  return timeline;
};
