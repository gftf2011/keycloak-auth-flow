import { UserServiceImpl } from "../../../../application/user.service";
import { STORAGE_TYPE, StorageImpl } from "../../../../infra/gateways/storage";
import { AxiosUserGatewayImpl } from "../../../../infra/gateways/user";

import { ProfilePage } from "../../../../presentation/pages";
import { PrivateRoute } from "../../../proxies";

export const makeProfile: React.FC = () => {
  const storage = new StorageImpl(STORAGE_TYPE.SESSION);

  const userGate = new AxiosUserGatewayImpl(import.meta.env.VITE_SERVER_URL);

  const service = new UserServiceImpl(userGate, storage);

  return (
    <PrivateRoute storage={storage}>
      <ProfilePage userService={service} />;
    </PrivateRoute>
  );
};
