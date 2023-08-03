import Home from '../pages/Home';
import Cartones from '../pages/Cartones';
import About from '../pages/About';
import NotFound from '../pages/NotFound';

const routes = [
  { name: 'Home', element: <Home />, path: '/' },
  { name: 'Cartones', element: <Cartones />, path: '/cartones' },
  { name: 'Acerca de', element: <About />, path: '/about' },
  { name: 'NotFound', element: <NotFound />, path: '*' },
];

export const getRouteList = () => {
  return routes
    .map( route => {
      return {
        name: route.name,
        path: route.path,
      };
    } )
    .filter( route => route.path !== '*' );
};

export default routes;
