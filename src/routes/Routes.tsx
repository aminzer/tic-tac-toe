import { Routes as ReactRouterRoutes, Route } from 'react-router';
import Home from '@app/screens/Home';
import LocalMultiplayerGame from '@app/screens/LocalMultiplayerGame';

const Routes: React.FC = () => {
  return (
    <ReactRouterRoutes>
      <Route index element={<Home />} />
      <Route path="game" element={<LocalMultiplayerGame />} />
    </ReactRouterRoutes>
  );
};

export default Routes;
