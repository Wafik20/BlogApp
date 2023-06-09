import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/auth-context";
import useAuth from "./context/auth-context";
import Register from "./auth/Register";
import currentUserService from "./services/current-user.service";
import PrivateRoutes from "./utils/PrivateRoutes";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const { user, isAuthenticated, token } = useAuth();
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
