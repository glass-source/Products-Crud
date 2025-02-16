import { useContext } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function createAuthedClient () {
    const token = localStorage.getItem("token");
    return axios.create({
      baseURL: "https://localhost:443",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "auth-token": token || "",
      },
    });
};

