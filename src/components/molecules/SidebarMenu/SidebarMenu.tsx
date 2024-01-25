import gsap from 'gsap';
import { FC, useEffect, useMemo, useRef } from 'react';
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom';

import { removeBaseUrl } from '@/common/utils';
import { PATHS } from '@/routes';
import { getPathIndex } from '@/routes/gsapLoader';

export const SidebarMenuItem: FC<NavLinkProps> = (props) => {
  return <NavLink {...props} />;
};
const entries = Object.entries(PATHS);

export const SidebarMenu = () => {
  const location = useLocation();
  const prevLocation = useRef(location);

  const tl = useMemo(
    () =>
      gsap.timeline({
        defaults: {
          duration: 0.3,
          ease: 'back.out',
        },
      }),
    []
  );

  useEffect(() => {
    const isDifferentPath = prevLocation.current.pathname !== location.pathname;

    if (!isDifferentPath) return;

    const fromPathname = removeBaseUrl(prevLocation.current.pathname);
    const toPathname = removeBaseUrl(location.pathname);

    const fromIndex = getPathIndex(fromPathname);
    const toIndex = getPathIndex(toPathname);

    const direction = fromIndex < toIndex ? 1 : -1;

    tl.set('.main-content', { y: direction * window.innerHeight, opacity: 0 })
      .to('.main-content', { y: 0, opacity: 1 })
      .to('.main-content', {
        scale: 1,
      });
    prevLocation.current = location;
  }, [location, tl]);

  return (
    <nav className="flex h-full w-full flex-col">
      {entries.map(([key, value]) => (
        <SidebarMenuItem
          key={key}
          to={value.path}
          className={({ isActive }) =>
            `p-4 uppercase text-black transition-all duration-75 ease-in hover:bg-gray-100 ${isActive && 'pointer-events-none bg-black text-white hover:bg-black'}`
          }
        >
          {value.name}
        </SidebarMenuItem>
      ))}
    </nav>
  );
};
