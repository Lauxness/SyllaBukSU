import { useEffect } from "react";
import LoginCard from "../Components/Login/LoginCard";
import Aos from "aos";
import "aos/dist/aos.css";
function LoginPage(props) {
  useEffect(() => {
    Aos.init();
  });
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: -1,
          width: "400px",
          height: "400px",
          left: 0,
          top: "80%",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(80, 182, 255, 0.16)",
            height: "100%",
            width: "100%",
            borderRadius: "50%",
            boxShadow: "0 0 100px 100px rgba(80,182,255,0.16)",
          }}
        ></div>
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: -1,
          width: "700px",
          height: "700px",
          left: -200,
          top: -200,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(80, 182, 255, 0.16)",
            height: "100%",
            width: "100%",
            borderRadius: "50%",
            boxShadow: "0 0 100px 100px rgba(80,182,255,0.16)",
          }}
        ></div>
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: -1,
          width: "100px",
          height: "100px",
          right: 0,
          top: -50,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(80, 182, 255, 0.16)",
            height: "100%",
            width: "100%",
            borderRadius: "50%",
            boxShadow: "0 0 100px 100px rgba(80,182,255,0.16)",
          }}
        ></div>
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: -1,
          width: "400px",
          height: "400px",
          right: -100,
          bottom: "50%",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(80, 182, 255, 0.16)",
            height: "100%",
            width: "100%",
            borderRadius: "50%",
            boxShadow: "0 0 100px 100px rgba(80,182,255,0.16)",
          }}
        ></div>
      </div>
      <LoginCard setIsAuthenticated={props.setIsAuthenticated} />
    </div>
  );
}

export default LoginPage;
