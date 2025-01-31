import styles from "./LoginCard.module.css";
import GoogleLogo from "../../assets/Google Logo.png";
import Logo from "../../assets/Logo.png";
import Illustraion from "../../assets/Login Illustration.png";
import { useState } from "react";
import { Login } from "../../api";
import { useNavigate } from "react-router-dom";
function LoginCard() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    const input = e.target.value;
    setEmail(input);
    console.log(input);
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    console.log(input);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { email, password };

    try {
      const response = await Login(credentials);

      if (response.status === 200) {
        console.log("Logged in");
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div>
            <img src={Logo} alt="" height={100} />
          </div>
          <img src={Illustraion} alt="" height={300} />
          <p>SyllaBukSU Portal</p>
        </div>
        <div className={styles.rightContainer}>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <p className={styles.loginText}>Login to your Account</p>
            <div className={styles.inputGroup}>
              <label htmlFor="">Email Address</label>
              <input
                type="text"
                required
                onChange={(e) => handleEmailChange(e)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="">Password</label>
              <input
                type="password"
                required
                onChange={(e) => handlePasswordChange(e)}
              />
            </div>
            <div className={styles.extraContainer}>
              <div>
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">Remember me</label>
              </div>
              <a href="#">Forgot password?</a>
            </div>
            <button className={styles.loginButton} type="submit">
              Login
            </button>
            <div className={styles.break}>
              <p>or</p>
            </div>

            <div className={styles.googleLogin}>
              <img src={GoogleLogo} alt="" height={30} width={30} />
              <p>Continue with google</p>
            </div>
            <div className={styles.createAccount}>
              <p>
                Dont have an account yet? <a href=""> Click here</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default LoginCard;
