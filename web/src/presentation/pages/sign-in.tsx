import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../application/contracts/services/auth";

type Props = {
  authService: AuthService;
};

export const SignInPage: React.FC<Props> = ({ authService }) => {
  const navigate = useNavigate();
  const running = useRef(false);

  useEffect(() => {
    if (running.current) return;

    running.current = true;

    const fetch = async (): Promise<void> => {
      await authService.authenticate();
      navigate("/profile");
    };

    fetch();
  }, []);

  return <></>;
};
