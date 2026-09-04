// src/utils/userService.ts
import tokenService from "./tokenService";
import type { User } from "../shared.types";
import axios from "axios";

const BASE_URL = "/api/users/";

type LoginCredentials = {
  email: string;
  password: string;
};

// This is the data that will be sent to the server
type SignupData = {
  username: string;
  email: string;
  password: string;
  passwordConf: string;
};

function getUser(): User | null {
  return tokenService.getUserFromToken();
}

async function signup(user: SignupData): Promise<void> {
  try {
    const res = await axios.post(BASE_URL + "signup", user);
    // The server responds with a JWT token
    tokenService.setToken(res.data.token);
  } catch (err) {
    // This will be caught by the .catch in handleSubmit
    throw new Error("Username or Password not accepted");
  }
}

function logout(): void {
  tokenService.removeToken();
}

async function login(creds: LoginCredentials): Promise<void> {
  try {
    const res = await axios.post(BASE_URL + "login", creds);
    tokenService.setToken(res.data.token);
  } catch (err) {
    console.log("err", "this is error", err);
    throw new Error("Bad Credentials!");
  }
}


export default {
  signup,
  getUser,
  logout,
  login,
};