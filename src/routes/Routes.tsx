import { Navigate, Routes as ReactRouterRoutes, Route } from 'react-router';
import Home from '@app/screens/Home';
import LocalMultiPlayerGame from '@app/screens/LocalMultiPlayerGame';
import LocalSinglePlayerGame from '@app/screens/LocalSinglePlayerGame';

const Routes: React.FC = () => {
  return (
    <ReactRouterRoutes>
      <Route index element={<Home />} />
      <Route path="/single-player" element={<LocalSinglePlayerGame />} />
      <Route path="/multi-player" element={<LocalMultiPlayerGame />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </ReactRouterRoutes>
  );
};

export default Routes;
