import { createHashRouter } from 'react-router-dom';

import { MainLayout } from '@/components/layouts';
import { Home, LinesScreen } from '@/screens';

import { gsapLoader } from './gsapLoader';
import { PATHS } from './paths';

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: PATHS.HOME.path,
        element: <Home />,
        loader: () => gsapLoader(PATHS.HOME),
      },
      {
        path: PATHS.LINES.path,
        element: <LinesScreen />,
        loader: () => gsapLoader(PATHS.LINES),
      },
      {
        path: PATHS.GALAXY.path,
        element: <GalaxyScreen />,
        loader: () => gsapLoader(PATHS.GALAXY),
      },
      {
        path: PATHS.TABLE.path,
        element: <TableScreen />,
        loader: () => gsapLoader(PATHS.TABLE),
      },
      {
        path: PATHS.ABOUT.path,
        element: (
          <div className="flex h-full w-full items-center justify-center bg-red-400">
            <h1 className="text-9xl uppercase text-white">About</h1>
          </div>
        ),
        loader: () => gsapLoader(PATHS.ABOUT),
      },
    ],
  },
]);
