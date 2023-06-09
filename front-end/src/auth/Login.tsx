import React, { useRef, useState, useEffect } from "react";
import useAuth from "../context/auth-context";
import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import UserLoginRequest from "../models/UserLoginRequest";

const Login = () => {
  const { login, error } = useAuth();
  //hooks
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  const [success, setSuccess] = useState<boolean>(false);
  //---------------------------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request = {
      email: email,
      password: pwd,
    } as UserLoginRequest;
    login(request);
  };
  // try {
  //   const user: UserLoginRequest = {
  //     email: email,
  //     password: pwd,
  //   };
  //   const res = await AuthService.login(user).then((res) => {
  //     if (res.status === 200) {
  //       setSuccess(true);
  //     } else {
  //       throw new Error();
  //     }
  //   });
  // } catch (error: any) {
  //   setError(error.message);
  // }

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  //---------------------------------------------------------

  //styles
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0", backgroundColor: "#1bbd7e" };
  const TextFieldStyle = { margin: "10px 0" };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  //---------------------------------------------------------

  return success ? (
    <div>Logged in</div>
  ) : (
    <Grid style={paperStyle}>
      <div>
        <Paper elevation={10} style={paperStyle}>
          {error ? <Alert severity="error">{error.message}</Alert> : null}
          <div className="flex flex-col items-center m-2">
            <Avatar className="m-2" style={avatarStyle}>
              <LockOutlined />
            </Avatar>
            <h1 className="font-bold text-3xl">Login</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                placeholder="Enter email"
                label="Email"
                type="text"
                id="username"
                name="user"
                ref={emailRef}
                value={email}
                autoComplete="off"
                required
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                label="Password"
                placeholder="Enter password"
                type="password"
                id="pwd"
                name="pwd"
                value={pwd}
                fullWidth
                required
                style={TextFieldStyle}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => {
                  setPwd(e.target.value);
                }}
              />
              <FormControlLabel
                control={<Checkbox name="checkedB" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
              >
                Sign in
              </Button>
              <Typography>
                <Link href="#">Forgot password ?</Link>
              </Typography>
              <Typography>
                {" "}
                Do you have an account ?<Link href="\register">Sign Up</Link>
              </Typography>
            </form>
          </div>
        </Paper>
      </div>
    </Grid>
  );
};
export default Login;
