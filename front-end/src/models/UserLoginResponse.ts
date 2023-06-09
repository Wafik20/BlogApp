import User from "./User";

interface UserLoginResponse {
  user: User;
  token: string;
  status: number;
}

export default UserLoginResponse;
