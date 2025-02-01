import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    const token = JSON.parse(data)?.token;
    console.log(token);
    if (token) {
      setIsAuthenticated(true);
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/home", { replace: true });
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
