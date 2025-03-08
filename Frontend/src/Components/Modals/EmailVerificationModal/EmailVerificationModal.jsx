import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { MdClose } from "react-icons/md";
import VerificationInput from "react-verification-input";
import { SendOTP } from "../../../api";
import { toast } from "react-toastify";
import Loader from "../Loading/Loader";
import { Register } from "../../../api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
function EmailVerificationModal(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleResend = async () => {
    const email = props.newAccount.email;
    try {
      setIsLoading(true);
      const response = await SendOTP({ email });
      console.log(response);
      if (response.status === 200) {
        props.setMinutes(1);
        props.setSeconds(59);
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
        text: err.response.data.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleVerifyEmail = async (otpValue) => {
    const { email, name, password } = props.newAccount;
    const formData = {
      email,
      name,
      password,
      otpValue,
    };
    try {
      setIsLoading(true);
      const response = await Register(formData);
      if (response.status === 200) {
        props.setTriggerOTP(false);
        Swal.fire({
          icon: "success",
          title: "Congratulations!",
          text: response.data.message,
        }).then(() => {
          navigate("/login");
        });
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
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (props.seconds > 0) {
        props.setSeconds(props.seconds - 1);
      }
      if (props.seconds === 0) {
        if (props.minutes === 0) {
          clearInterval(interval);
        } else {
          props.setSeconds(59);
          props.setMinutes(props.minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [props.seconds]);
  return (
    <div className={styles.container}>
      {isLoading ? <Loader backgroundColor="#0000001e" /> : ""}
      <div className={styles.innerContainer}>
        <div className={styles.heading}>
          <p>Email Verification</p>
          <MdClose
            fontSize="1.2em"
            cursor="pointer"
            onClick={() => props.setTriggerOTP(false)}
          />
        </div>
        <div className={styles.bodyContainer}>
          <p>Check your email for OTP. Valid for 10 minutes</p>
          <div>
            <VerificationInput
              placeholder=""
              classNames={{
                container: styles.InputContainer,
                character: styles.character,
                characterInactive: styles.characterInactive,
                characterSelected: "character--selected",
                characterFilled: "character--filled",
              }}
              onComplete={(value) => handleVerifyEmail(value)}
            />
          </div>
        </div>
        <div className={styles.resendOTP}>
          <p>
            Time remaining to resend:{" "}
            <span style={{ fontWeight: "500" }}>
              {props.minutes < 10 ? `0${props.minutes}` : props.minutes}:
              {props.seconds < 10 ? `0${props.seconds}` : props.seconds}
            </span>
          </p>
          <button
            disabled={props.seconds > 0 || props.minutes > 0}
            onClick={() => handleResend()}
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
}
export default EmailVerificationModal;
