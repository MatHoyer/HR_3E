import { Route, Routes } from 'react-router-dom';
import { Export, Home, NewMap, Upload } from './Pages';

export const routes = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
  },
  {
    name: 'Export',
    path: '/export',
    element: <Export />,
  },
];

const notOnNavBarRoutes = [
  {
    name: 'Upload',
    path: '/upload',
    element: <Upload />,
  },
  {
    name: 'Create new map',
    path: '/new-map',
    element: <NewMap />,
  },
];

export const Router = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.name} path={route.path} element={route.element} />
      ))}
      {notOnNavBarRoutes.map((route) => (
        <Route key={route.name} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
