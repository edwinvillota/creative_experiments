import { createBrowserRouter } from 'react-router-dom';

import { Home } from '@/screens';

import { PATHS } from './paths';

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <Home />,
  },
  {
    path: PATHS.ABOUT,
    element: <div>About page</div>,
  },
]);
