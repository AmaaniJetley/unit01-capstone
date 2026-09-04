// src/utils/tokenService.ts
import type { User } from "../shared.types";

function getUserFromToken(): User | null {
  const token = getToken(); // getToken is also in this file
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.user;
}

// ... rest of the file

function getToken(): string | null {
  try {
    const token = localStorage.getItem("token");
    return token && token.trim() !== "" ? token : null;
  } catch (err) {
    console.error("Error accessing localStorage:", err);
    return null;
  }
}

function setToken(token: string): void {
  try {
    if (typeof token !== "string" || token.trim() === "") {
      throw new Error("Invalid token format");
    }
    localStorage.setItem("token", token);
  } catch (err) {
    console.error("Error saving token:", err);
  }
}

// }
function removeToken(): void {
  localStorage.removeItem("token");
}

export default {
  getUserFromToken,
  getToken,
  setToken,
  removeToken,
};