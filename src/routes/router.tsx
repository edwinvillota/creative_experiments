import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@/components/layouts';
import { Home } from '@/screens';

import { gsapLoader } from './gsapLoader';
import { PATHS } from './paths';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,

    children: [
      {
        path: PATHS.HOME.path,
        element: <Home />,
        loader: () => gsapLoader(PATHS.HOME, window.location.pathname),
      },
      {
        path: PATHS.CANVAS_2D.path,
        element: <div>Canvas 2D page</div>,
        loader: () => gsapLoader(PATHS.CANVAS_2D, window.location.pathname),
      },
      {
        path: PATHS.ABOUT.path,
        element: <div>About page</div>,
        loader: () => gsapLoader(PATHS.ABOUT, window.location.pathname),
      },
    ],
  },
]);
