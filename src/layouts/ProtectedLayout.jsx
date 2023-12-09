import { useEffect } from "react";
import UseAuth from "../context/AuthContext";
import axios from "../api/axios";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const { user, setUser } = UseAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/user");

        if (response.status === 200) {
          setUser(response.data.data);
        }
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("user");
        }
      }
    })();
  }, []);

  useEffect(() => {
    localStorage.getItem("user") ? null : setUser(localStorage.getItem("user"));
  }, [user]);

  if (!user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedLayout;
