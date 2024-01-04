import { useRef, useEffect, useState } from "react";
import { UserService } from "../../application/contracts/services/user";

type Props = {
  userService: UserService;
};

export const ProfilePage: React.FC<Props> = ({ userService }) => {
  const [profile, setProfile] = useState<{
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  } | null>(null);
  const running = useRef(false);

  useEffect(() => {
    if (running.current) return;

    running.current = true;

    const fetch = async (): Promise<void> => {
      const response = await userService.me();
      setProfile(response);
    };

    fetch();
  }, []);

  return profile ? (
    <div>
      <div>Profile</div>
      <hr />
      <p>ID: {profile.id}</p>
      <p>USERNAME: {profile.username}</p>
      <p>EMAIL: {profile.email}</p>
      <p>FIRST NAME: {profile.first_name}</p>
      <p>LAST NAME: {profile.last_name}</p>
    </div>
  ) : (
    <div>Profile</div>
  );
};
