import { STORAGE_TYPE, StorageImpl } from "../../../../infra/gateways/storage";

import { ProfilePage } from "../../../../presentation/pages";
import { PrivateRoute } from "../../../proxies";

export const makeProfile: React.FC = () => {
  const storage = new StorageImpl(STORAGE_TYPE.LOCAL);

  return (
    <PrivateRoute storage={storage}>
      <ProfilePage />;
    </PrivateRoute>
  );
};
