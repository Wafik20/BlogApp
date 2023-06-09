import { SetStateAction, useEffect, useRef, useState } from "react";
import { AiOutlineCheck, AiOutlineUser } from "react-icons/ai";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import authService from "../services/current-user.service";
import useAuth from "../context/auth-context";
import User from "../models/User";
import UserRegisterRequest from "../models/UserRegisterRequest";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { Alert } from "@mui/material";
const EMAIL_REGEX: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{8,24}$/;
const REGISTER_URL = "/auth/register";
const Register = () => {
  const { register, loading, error, login, logout, user } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  //styles
  const paperStyle = {
    padding: 20,
    height: "50%",
    width: "60%",
    margin: "20px auto",
    display: "flex-column",
    alignItems: "center",
    justifyContent: "center",
  };
  const btnstyle = { margin: "8px 0", backgroundColor: "#1bbd7e" };
  const TextFieldStyle = { margin: "10px 0" };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const result: SetStateAction<boolean> = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result: SetStateAction<boolean> = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const matchResult: SetStateAction<boolean> = pwd === matchPwd;
    setValidMatch(matchResult);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validEmail && validPwd && validMatch) {
      const newUser: UserRegisterRequest = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: pwd,
        createdAt: new Date().toLocaleString(),
        updatedAt: null,
      };
      register(newUser);
    }
  };

  return (
    <Grid style={paperStyle}>
      <div>
        <Paper elevation={10} style={paperStyle}>
          {error ? <Alert severity="error">{error.message}</Alert> : null}
          <div className="flex flex-col items-center m-2">
            <Avatar className="m-2" style={avatarStyle}>
              <AiOutlineUser />
            </Avatar>
            <h1 className="font-bold text-3xl">Register</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  fullWidth
                  placeholder="Enter first name"
                  label="First Name"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstname}
                  autoComplete="off"
                  required
                  style={TextFieldStyle}
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => {
                    setFirstname(e.target.value);
                  }}
                />
              </div>
              <TextField
                fullWidth
                placeholder="Enter last name"
                label="Last Name"
                type="text"
                id="lastName"
                name="lastName"
                value={lastname}
                autoComplete="off"
                required
                style={TextFieldStyle}
                onChange={(e: {
                  target: { value: SetStateAction<string> };
                }) => {
                  setLastname(e.target.value);
                }}
              />
              <div>
                {!validEmail && email !== "" ? (
                  <Alert severity="warning">Choose a valid email</Alert>
                ) : null}
                <TextField
                  fullWidth
                  placeholder="Enter email"
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  autoComplete="off"
                  required
                  style={TextFieldStyle}
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                {!validPwd && pwd !== "" ? (
                  <Alert severity="warning">
                    Password must contain 8-24 characters, 1 uppercase, 1
                    lowercase, 1 number and 1 special character
                  </Alert>
                ) : null}
                <TextField
                  fullWidth
                  placeholder="Enter password"
                  label="Password"
                  type="password"
                  id="password"
                  name="password"
                  value={pwd}
                  required
                  style={TextFieldStyle}
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => {
                    setPwd(e.target.value);
                  }}
                />
              </div>
              <div>
                {!validMatch && matchPwd !== "" ? (
                  <Alert severity="warning">Passwords do not match</Alert>
                ) : null}
                <TextField
                  fullWidth
                  placeholder="Re-enter password"
                  label="Re-enter Password"
                  type="password"
                  id="reenterPassword"
                  name="reenterPassword"
                  value={matchPwd}
                  required
                  style={TextFieldStyle}
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => {
                    setMatchPwd(e.target.value);
                  }}
                />
              </div>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
              >
                Sign Up
              </Button>
              <Typography>
                Already have an account?<Link href="\login">Login</Link>
              </Typography>
            </form>
          </div>
        </Paper>
      </div>
    </Grid>
  );
};
export default Register;
