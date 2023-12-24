import { SignInPage } from "../../../../presentation/pages";
import { makeAuthService } from "../../application/services";
import { LoggedInRoute } from "../../../proxies";
import { LocalStorage } from "../../../../infra/gateways";

export const makeSignIn: React.FC = () => {
  return <SignInPage authService={makeAuthService()} />;
  // return (
  //   <LoggedInRoute storage={LocalStorage.getInstance()}>

  //   </LoggedInRoute>
  // );
};
