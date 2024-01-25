import { Bars3Icon } from '@heroicons/react/16/solid';
import { Outlet } from 'react-router-dom';

import { SidebarMenu } from '@/components/molecules';
import { useMenuStore } from '@/store/client';

export const MainLayout = () => {
  const isMenuOpen = useMenuStore.use.isOpen();
  const toogleMenu = useMenuStore.use.toggle();

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <nav
        className={`absolute top-0 z-10 flex  transition-all duration-75 ease-in ${isMenuOpen ? 'left-80' : 'left-0'} `}
      >
        <button
          className={`flex h-full w-full items-center justify-center bg-transparent p-4`}
          onClick={() => toogleMenu()}
        >
          <Bars3Icon className="h-6 w-6 text-black" />
        </button>
      </nav>
      <aside
        className={`absolute top-0 z-10 flex h-full w-80 flex-col bg-white transition-all duration-75 ease-in ${isMenuOpen ? 'left-0' : '-left-80'}`}
      >
        <SidebarMenu />
      </aside>
      <main className="main-content z-0 h-full w-full">
        <Outlet />
      </main>
    </div>
  );
};
