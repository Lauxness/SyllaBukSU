import VerificationInput from "react-verification-input";
import styles from "./style.module.css";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { VerifyOTP, FindAccount } from "../../../api";
import Loader from "../Loading/Loader";
import { toast } from "react-toastify";
export const StepOne = (props) => {
  return (
    <div
      className={
        props.animation == "back"
          ? `${styles.contentForm} ${styles.back}`
          : `${styles.contentForm} ${styles.next}`
      }
    >
      <div style={{ width: "100%" }}>
        <p style={{ fontSize: "1.3em", textAlign: "center", fontWeight: 500 }}>
          Find your account
        </p>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="">Please input your email:</label>
        <input type="email" ref={props.email} />
      </div>
    </div>
  );
};
export const StepTwo = (props) => {
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const handleResend = async () => {
    const email = localStorage.getItem("email");
    try {
      setIsLoading(true);
      const response = await FindAccount({ email });
      console.log(response);
      if (response.status === 200) {
        setMinutes(1);
        setSeconds(59);
        toast.success("Email sent", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        background: "#202020",
        color: "white",
        text: err.response.data.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmitOTP = async (otpValue) => {
    const email = localStorage.getItem("email");
    const credentials = { otpValue, email };
    if (!email) {
      Swal.fire({
        icon: "error",
        background: "#202020",
        color: "white",
        text: "Email address is Missing!",
      });
      return;
    }
    try {
      setIsLoading(true);
      const response = await VerifyOTP(credentials);
      if (response.status === 200) {
        props.handleNext();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        background: "#202020",
        color: "white",
        text: err.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  return (
    <div
      style={{ position: "relative" }}
      className={
        props.animation == "back"
          ? `${styles.contentForm} ${styles.back}`
          : `${styles.contentForm} ${styles.next}`
      }
    >
      {isLoading ? <Loader backgroundColor="none" /> : ""}
      <div style={{ width: "100%" }}>
        <p style={{ fontSize: "1.3em", textAlign: "center", fontWeight: 500 }}>
          One Time Pin verification
        </p>
      </div>
      <div className={styles.bodyContainer}>
        <p>Check your email for OTP. Valid for 10 minutes</p>
        <div>
          <VerificationInput
            ref={props.OTPRef}
            placeholder=""
            classNames={{
              container: styles.InputContainer,
              character: styles.character,
              characterInactive: styles.characterInactive,
              characterSelected: "character--selected",
              characterFilled: "character--filled",
            }}
            onComplete={(value) => handleSubmitOTP(value)}
          />
        </div>
      </div>
      <div className={styles.resendOTP}>
        <p>
          Time remaining to resend:
          <span style={{ fontWeight: "500" }}>
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </p>
        <button
          disabled={seconds > 0 || minutes > 0}
          onClick={() => handleResend()}
        >
          Resend
        </button>
      </div>
    </div>
  );
};
export const StepThree = (props) => {
  return (
    <div
      className={
        props.animation == "back"
          ? `${styles.contentForm} ${styles.back}`
          : `${styles.contentForm} ${styles.next}`
      }
    >
      <div style={{ width: "100%" }}>
        <p style={{ fontSize: "1.3em", textAlign: "center", fontWeight: 500 }}>
          Create new password
        </p>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="">New Password</label>
        <input type="password" ref={props.newPassword} />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="">Confirm Password</label>
        <input type="password" ref={props.confirmPassword} />
      </div>
    </div>
  );
};
