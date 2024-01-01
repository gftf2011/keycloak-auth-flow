import { useRef, useEffect } from "react";
import { UserService } from "../../application/contracts/services/user";

type Props = {
  userService: UserService;
};

export const ProfilePage: React.FC<Props> = ({ userService }) => {
  const running = useRef(false);

  useEffect(() => {
    if (running.current) return;

    running.current = true;

    const fetch = async (): Promise<void> => {
      await userService.me();
    };

    fetch();
  }, []);

  return <div>Profile</div>;
};
