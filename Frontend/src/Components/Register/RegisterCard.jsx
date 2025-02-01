import styles from "./RegisterCard.module.css";
import EmailVerificationModal from "../Modals/EmailVerificationModal/EmailVerificationModal";
import Logo from "../../assets/Logo.png";
import SignupIllustration from "../../assets/SignupIllustration.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Register from "../../Pages/Register";
function LoginCard(props) {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [triggerOTP, setTriggerOTP] = useState(false);
  const [borderColor, setBorderColor] = useState("");
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(1);
  const handleNameChange = (e) => {
    const input = e.target.value;
    setName(input);
    console.log(input);
  };
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
  const handleConfirmPasswordChange = (e) => {
    const input = e.target.value;
    setConfirmPassword(input);
    if (password !== input) {
      setBorderColor("1px solid rgba(255, 38, 38, 0.66)");
    } else {
      setBorderColor("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        text: "Password does not matched!",
      });
    } else {
      setTriggerOTP(true);
    }
  };

  return (
    <>
      {triggerOTP ? (
        <EmailVerificationModal
          setTriggerOTP={setTriggerOTP}
          setSeconds={setSeconds}
          seconds={seconds}
          setMinutes={setMinutes}
          minutes={minutes}
        />
      ) : (
        ""
      )}
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.logoContainer}>
            <img src={Logo} alt="" height={50} />
            <p>SyllaBukSU Portal</p>
          </div>
          <img src={SignupIllustration} alt="" height={300} />
          <div className={styles.registerButton}>
            <p>Already a member? Log in here!</p>
            <button onClick={() => navigate("/login")}>Login here</button>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <p className={styles.loginText}>Create new Account</p>
            <div className={styles.inputGroup}>
              <label htmlFor="">Name</label>
              <input
                type="text"
                required
                onChange={(e) => handleNameChange(e)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="">Email</label>
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
                style={{ outline: borderColor }}
                onChange={(e) => handlePasswordChange(e)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                style={{ outline: borderColor }}
                onChange={(e) => handleConfirmPasswordChange(e)}
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
            </div>
            <button className={styles.loginButton} type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default LoginCard;
