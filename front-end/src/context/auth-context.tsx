import { createContext } from "react";
import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import authService from "../services/current-user.service";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import User from "../models/User";
import UserLoginRequest from "../models/UserLoginRequest";
import UserRegisterRequest from "../models/UserRegisterRequest";
import UserLoginResponse from "../models/UserLoginResponse";
import api from "../api/api";
import currentUserService from "../services/current-user.service";

interface AuthContextType {
  user?: User;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error?: any;
  login: (
    credentials: UserLoginRequest
  ) => Promise<UserLoginResponse | undefined>;
  register: (request: UserRegisterRequest) => Promise<User | undefined>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // We are using `react-router` for this example,
  // but feel free to omit this or use the
  // router of your choice.
  // const location = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [location.pathname]);

  // Check if there is a currently active session
  // when the provider is mounted for the first time.
  //
  // If there is an error, it means there is no session.
  //
  // Finally, just signal the component that the initial load
  // is over.
  useEffect(() => {
    currentUserService
      .getCurrentUser()
      .then((user: User | null) => {
        if (user) {
          setUser(user);
          setIsAuthenticated(true);
        } else {
          setUser(undefined);
          setIsAuthenticated(false);
        }
      })
      .catch((_error: any) => {})
      .finally(() => setLoadingInitial(false));
  }, []);

  // Flags the component loading state and posts the login
  // data to the server.
  //
  // An error means that the email/password combination is
  // not valid.
  //
  // Finally, just signal the component that loading the
  // loading state is over.
  // function login(email: string, password: string) {
  //   setLoading(true);

  //   authService
  //     .login({ email, password })
  //     .then((res) => {
  //       setUser(res.user);
  //       navigate("/");
  //     })
  //     .catch((error) => setError(error))
  //     .finally(() => setLoading(false));
  // }

  const login = async (
    credentials: UserLoginRequest
  ): Promise<UserLoginResponse | undefined> => {
    setLoading(true);
    try {
      const response = await api.post("authenticate", {
        email: credentials.email,
        password: credentials.password,
      });

      setUser(response.data.user as User);

      if (response.data.token && response.request.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
        setToken(response.data.token);
        setIsAuthenticated(true);
      }
      setLoading(false);
      navigate("/");
      return response.data as UserLoginResponse;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  // Sends sign up details to the server. On success we just apply
  // the created user to the state.
  // function register(
  //   firstname: string | null,
  //   lastname: string | null,
  //   email: string,
  //   password: string,
  //   createdAt: string,
  //   updatedAt: string | null
  // ) {
  //   setLoading(true);

  //   authService
  //     .register({ firstname, lastname, email, password, createdAt, updatedAt })
  //     .then((user) => {
  //       setUser(user);
  //       navigate("/");
  //     })
  //     .catch((error) => setError(error))
  //     .finally(() => setLoading(false));
  // }
  const register = async (
    request: UserRegisterRequest
  ): Promise<User | undefined> => {
    setLoading(true);
    try {
      const response = await api.post("register", {
        firstname: request.firstname,
        lastname: request.lastname,
        email: request.email,
        password: request.password,
        createdAt: request.createdAt,
        updatedAt: request.updatedAt,
      });
      setLoading(false);
      navigate("/login");
      return response.data as User;
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  // Call the logout endpoint and then remove the user
  // from the state.
  // function logout() {
  //   authService.logout();
  //   setUser(undefined);
  // }
  const logout = (): void => {
    localStorage.removeItem("user");
    setUser(undefined);
    setToken(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      loading,
      error,
      login,
      register,
      logout,
    }),
    [user, loading, error]
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}
