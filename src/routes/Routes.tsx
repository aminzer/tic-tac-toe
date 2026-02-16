import { Routes as ReactRouterRoutes, Route } from 'react-router';
import Home from '@app/screens/Home';
import LocalMultiPlayerGame from '@app/screens/LocalMultiPlayerGame';
import LocalSinglePlayerGame from '@app/screens/LocalSinglePlayerGame';

const Routes: React.FC = () => {
  return (
    <ReactRouterRoutes>
      <Route index element={<Home />} />
      <Route path="game/local/single-player" element={<LocalSinglePlayerGame />} />
      <Route path="game/local/multi-player" element={<LocalMultiPlayerGame />} />
    </ReactRouterRoutes>
  );
};

export default Routes;
