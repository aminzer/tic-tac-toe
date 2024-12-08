import { Routes as ReactRouterRoutes, Route } from 'react-router';
import Game from '@app/screens/Game';
import Home from '@app/screens/Home';

const Routes: React.FC = () => {
  return (
    <ReactRouterRoutes>
      <Route index element={<Home />} />
      <Route path="game" element={<Game />} />
    </ReactRouterRoutes>
  );
};

export default Routes;
