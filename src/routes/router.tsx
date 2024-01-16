import { createBrowserRouter } from 'react-router-dom';

import { Home } from '@/screens';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <div>About page</div>,
  },
]);
