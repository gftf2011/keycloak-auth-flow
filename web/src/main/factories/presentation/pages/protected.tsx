import { PrivateRoute } from "../../../proxies";
import { LocalStorage } from "../../../../infra/gateways";

import { ProtectedPage } from "../../../../presentation/pages";

export const makeProtected: React.FC = () => {
  return <ProtectedPage />;
  // return (
  //   <PrivateRoute storage={LocalStorage.getInstance()}>

  //   </PrivateRoute>
  // );
};
