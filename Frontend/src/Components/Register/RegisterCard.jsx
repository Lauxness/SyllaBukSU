import styles from "./RegisterCard.module.css";
import EmailVerificationModal from "../Modals/EmailVerificationModal/EmailVerificationModal";
import Logo from "../../assets/Logo.png";
import SignupIllustration from "../../assets/SignupIllustration.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../Modals/Loading/Loader";
import { SendOTP } from "../../api";
import { ToastContainer, toast } from "react-toastify";
function LoginCard(props) {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState(false);
  const [triggerOTP, setTriggerOTP] = useState(false);
  const [borderColor, setBorderColor] = useState("");
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(1);
  const [newAccount, setNewAccount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleNameChange = (e) => {
    const input = e.target.value;
    setName(input);
    console.log(input);
  };
  const handleEmailChange = (e) => {
    const input = e.target.value;
    setEmail(input);
    setIsSent(false);
    setMinutes(1);
    setSeconds(59);
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
    const account = {
      name,
      email,
      password,
    };

    setNewAccount(account);
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        text: "Password does not matched!",
      });
    } else {
      try {
        setIsLoading(true);
        if (!isSent) {
          const response = await SendOTP({ email });
          if (response.status === 200) {
            toast.success("Email sent", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setIsSent(true);
            setTriggerOTP(true);
          }
        } else {
          setTriggerOTP(true);
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          text: err.response.data.message,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {triggerOTP ? (
        <EmailVerificationModal
          setTriggerOTP={setTriggerOTP}
          setSeconds={setSeconds}
          seconds={seconds}
          setMinutes={setMinutes}
          minutes={minutes}
          sentIsSent={setIsSent}
          newAccount={newAccount}
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
