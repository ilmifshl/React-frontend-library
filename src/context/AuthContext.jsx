import { createContext, useContext, useState } from "react";
import axios from "../api/axios";

const AuthContent = createContext({
  user: null,
  getUser: () => {},
  csrfToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, _setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const setUser = (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    _setUser(user);
  };

  const csrfToken = async () => {
    await axios.get("/sanctum/csrf-cookie");
    return true;
  };  

  return <AuthContent.Provider value={{ user, setUser, csrfToken }}>{children}</AuthContent.Provider>;
};

export default function UseAuth() {
  return useContext(AuthContent);
}