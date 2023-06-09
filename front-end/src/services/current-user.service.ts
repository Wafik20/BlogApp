import api from "../api/api";
import User from "../models/User";
import useAuth from "../context/auth-context";

class CurrentUserService {
  async getCurrentUser(): Promise<User | null> {
    try {
      const currUser: User = await api.get("user");
      if (currUser) {
        return currUser;
      } else {
        throw new Error("User not found");
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  async getCurrentUserToken(): Promise<string | null> {
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null) {
      return JSON.parse(storedUser);
    }
    // Handle the case where the 'user' item is null
    return null; // or any other appropriate default value
  }
}

export default new CurrentUserService();
