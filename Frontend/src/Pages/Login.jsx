import LoginCard from "../Components/Login/LoginCard";
import Aesthetics from "../assets/Aesthetics.png";
function LoginPage(props) {
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
      {" "}
      <div
        style={{
          position: "absolute",
          zIndex: -1,
          width: "600px",
          height: "600px",
          left: 200,
          bottom: -250,
        }}
      >
        <img src={Aesthetics} style={{ width: "100%" }} />
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: -1,
          width: "400px",
          height: "400px",
          left: -200,
          top: -200,
        }}
      >
        <img src={Aesthetics} style={{ width: "100%" }} />
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: -1,
          width: "500px",
          height: "500px",
          right: -100,
          top: -100,
        }}
      >
        <img src={Aesthetics} style={{ width: "100%" }} />
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: -1,
          width: "800px",
          height: "800px",
          right: -200,
          bottom: -500,
        }}
      >
        <img src={Aesthetics} style={{ width: "100%" }} />
      </div>
      <LoginCard setIsAuthenticated={props.setIsAuthenticated} />
    </div>
  );
}

export default LoginPage;
