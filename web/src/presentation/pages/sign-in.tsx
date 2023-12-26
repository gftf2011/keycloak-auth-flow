import { useEffect, useRef } from "react";
import { AuthService } from "../../application/contracts/services/auth";

type Props = {
  authService: AuthService;
};

export const SignInPage: React.FC<Props> = ({ authService }) => {
  const isRun = useRef(false);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;

    const fetch = async (): Promise<void> => {
      await authService.authenticate();
    };

    fetch();
  }, []);

  return <></>;
};
