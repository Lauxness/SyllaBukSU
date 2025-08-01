import styles from "./LoginCard.module.css";
import Logo from "../../assets/Logo.png";
import LoginIllustration from "../../assets/LoginIllustration.png";
import { useState } from "react";
import { Login } from "../../api";
import GoogleLogin from "./GoogleLogin";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Swal from "sweetalert2";
import ForgotPassword from "../Modals/ForgotPassword/ForgotPassword";
function LoginCard(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [triggerForgotPassword, setTriggerForgotPassword] = useState(false);
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    const input = e.target.value;
    setEmail(input);
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { email, password };

    try {
      const response = await Login(credentials);

      if (response.status === 200) {
        console.log(response.data);
        const userInfo = {
          token: response.data.token,
          name: response.data.userPayload.name,
          email: response.data.userPayload.email,
          ...(response.data.userPayload.program && {
            program: response.data.userPayload.program,
          }),
        };
        localStorage.setItem("user-info", JSON.stringify(userInfo));
        props.setIsAuthenticated(true);
        navigate("/generate_description");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        background: "#202020",
        color: "white",
        text: err.response.data.message,
      });
    }
  };

  return (
    <>
      {triggerForgotPassword ? (
        <ForgotPassword setTriggerForgotPassword={setTriggerForgotPassword} />
      ) : (
        ""
      )}
      <div
        className={styles.container}
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
        data-aos-duration="500"
      >
        <div className={styles.leftContainer}>
          <div className={styles.logoContainer} onClick={() => navigate("/")}>
            <img src={Logo} alt="" height={50} />
            <p>SyllaBukSU Portal</p>
          </div>
          <img src={LoginIllustration} alt="" height={300} />
          <div className={styles.registerButton}>
            <p>New here? Create an account now!</p>
            <button onClick={() => navigate("/register")}>Register here</button>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <p className={styles.loginText}>Login to your Account</p>
            <div className={styles.inputGroup}>
              <label htmlFor="">Email Address</label>
              <input
                type="email"
                required
                onChange={(e) => handleEmailChange(e)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                onChange={(e) => handlePasswordChange(e)}
              />
            </div>
            <div className={styles.extraContainer}>
              <div>
                <input
                  type="checkbox"
                  id="checkbox"
                  onChange={() => {
                    showPassword
                      ? setShowPassword(false)
                      : setShowPassword(true);
                  }}
                />
                <label htmlFor="checkbox">Show password</label>
              </div>
              <a href="#" onClick={() => setTriggerForgotPassword(true)}>
                Forgot password?
              </a>
            </div>
            <button className={styles.loginButton} type="submit">
              Login
            </button>
            <div className={styles.break}>
              <p>or</p>
            </div>
            <GoogleOAuthProvider clientId="405000156933-unqq4gvbb5efen3bagbnq57d2q2r6l68.apps.googleusercontent.com">
              <GoogleLogin setIsAuthenticated={props.setIsAuthenticated} />
            </GoogleOAuthProvider>
          </form>
        </div>
      </div>
    </>
  );
}
export default LoginCard;
