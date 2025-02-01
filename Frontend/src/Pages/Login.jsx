import LoginCard from "../Components/Login/LoginCard";
function LoginPage(props) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginCard setIsAuthenticated={props.setIsAuthenticated} />
    </div>
  );
}

export default LoginPage;
