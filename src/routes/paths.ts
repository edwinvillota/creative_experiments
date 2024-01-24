export interface IPath {
  name: string;
  path: string;
}

export const PATHS: Record<string, IPath> = {
  HOME: {
    name: 'Home',
    path: '/',
  },
  CANVAS_2D: {
    name: 'Canvas 2D',
    path: '/canvas-2d',
  },
  ABOUT: {
    name: 'About',
    path: '/about',
  },
} as const;
