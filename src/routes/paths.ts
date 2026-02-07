export interface IPath {
  name: string;
  path: string;
}

export const PATHS: Record<string, IPath> = {
  HOME: {
    name: 'Home',
    path: '/',
  },
  LINES: {
    name: 'Lines',
    path: '/lines',
  },
  GALAXY: {
    name: 'Galaxy',
    path: '/galaxy',
  },
  TABLE: {
    name: 'Table',
    path: '/table',
  },
  COLORSCHEME: {
    name: 'Color Scheme',
    path: '/colorscheme',
  },
  HOVER_TRANSITION: {
    name: 'Hover Transition',
    path: '/hovertransition',
  },
  SHADERS: {
    name: 'Shaders',
    path: '/shaders',
  },
  ABOUT: {
    name: 'About',
    path: '/about',
  },
} as const;
