import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@/components/layouts';
import { Home } from '@/screens';

import { PATHS } from './paths';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: PATHS.HOME,
        element: <Home />,
      },
      {
        path: PATHS.ABOUT,
        element: <div>About page</div>,
      },
    ],
  },
]);
