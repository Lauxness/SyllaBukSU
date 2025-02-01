import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../assets/Google Logo.png";
import { GoogleLoginRequest } from "../../api";
import styles from "./LoginCard.module.css";
import Swal from "sweetalert2";
function GoogleLogin(props) {
  const navigate = useNavigate();

  const handleGoogleResponse = async ({ code }) => {
    console.log(code);
    try {
      const response = await GoogleLoginRequest(code);

      const userInfo = {
        token: response.data.token,
        name: response.data.userPayload.name,
        email: response.data.userPayload.email,
      };
      console.log(userInfo);
      localStorage.setItem("user-info", JSON.stringify(userInfo));

      console.log("User Info:", userInfo);
      props.setIsAuthenticated(true);
      navigate("/home");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
      });
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleResponse,
    onError: (err) => {
      console.log(err);
    },
    flow: "auth-code",
  });

  return (
    <>
      <div className={styles.googleLogin} onClick={() => googleLogin()}>
        <img src={GoogleLogo} alt="" height={30} width={30} />
        <p>Continue with google</p>
      </div>
    </>
  );
}

export default GoogleLogin;
