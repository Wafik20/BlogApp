interface UserRegisterRequest {
  firstname: string | null;
  lastname: string | null;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string | null;
}

export default UserRegisterRequest;
