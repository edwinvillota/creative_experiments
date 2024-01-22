import { Bars3Icon } from '@heroicons/react/16/solid';
import { Outlet } from 'react-router-dom';

import { useMenuStore } from '@/store/client';

export const MainLayout = () => {
  const isMenuOpen = useMenuStore.use.isOpen();
  const toogleMenu = useMenuStore.use.toggle();

  return (
    <div className="relative flex h-full w-full">
      <nav
        className={`absolute  top-0 z-10 flex ${isMenuOpen ? 'left-80' : 'left-0'} `}
      >
        <button
          className={`flex h-full w-full items-center justify-center bg-white p-4 shadow-md `}
          onClick={() => toogleMenu()}
        >
          <Bars3Icon className="h-6 w-6 text-black" />
        </button>
      </nav>
      <aside
        className={`transition-width absolute left-0 top-0 z-10 flex h-full flex-col bg-white duration-75 ease-in ${isMenuOpen ? 'w-80' : 'w-0'}`}
      ></aside>
      <main className="z-0 h-full w-full">
        <Outlet />
      </main>
    </div>
  );
};
