import { RouteProps, Navigate } from "react-router-dom";

import { Storage } from "../../application/contracts/gateways/storage";

type Props = {
  storage: Storage;
} & RouteProps;

export const LoggedInRoute: React.FC<Props> = ({ storage, children }) => {
  const loggedIn = storage.get(Storage.KEYS.AUTH);
  return !loggedIn || !loggedIn.authenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/protected" />
  );
};
