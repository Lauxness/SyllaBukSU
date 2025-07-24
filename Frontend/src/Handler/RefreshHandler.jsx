import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated, setRole }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    const role = JSON.parse(data)?.role;
    const token = JSON.parse(data)?.token;
    if (token) {
      setIsAuthenticated(true);
      if (!role) {
        setRole("");
      }
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/register"
      ) {
        navigate("/generate_description", { replace: true });
      }
    } else {
      setIsAuthenticated(false);
      if (!location.pathname === "/register") {
        navigate("/login", { replace: true });
      }
    }
  }, []);

  return null;
}

export default RefreshHandler;
