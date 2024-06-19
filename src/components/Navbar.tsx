import { routes } from '@/Router';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav className="flex sticky items-center top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex w-full h-14 container">
        <div className="mr-4 flex items-center">
          <nav className="flex items-end space-x-6 text-md font-medium">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  cn('transition-colors hover:text-foreground/80 text-foreground/60', isActive && 'text-foreground')
                }
              >
                {route.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
};
