import RegisterCard from "../Components/Register/RegisterCard";
import Aesthetics from "../assets/Aesthetics.png";
function Register() {
  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
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
        <RegisterCard />
      </div>
    </>
  );
}

export default Register;
