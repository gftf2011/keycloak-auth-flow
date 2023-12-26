import { RouteProps, Navigate } from "react-router-dom";

import { StorageGateway } from "../../application/contracts/gateways/storage";

type Props = {
  storage: StorageGateway;
} & RouteProps;

export const PrivateRoute: React.FC<Props> = ({ storage, children }) => {
  const loggedIn = storage.get(StorageGateway.KEYS.AUTH);
  return loggedIn && loggedIn.authenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/sign-in" />
  );
};
