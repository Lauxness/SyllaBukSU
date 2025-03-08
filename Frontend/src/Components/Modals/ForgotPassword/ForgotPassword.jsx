import { useMemo, useRef, useState, useCallback } from "react";
import styles from "./style.module.css";
import Progress from "./Progress";
import { MdClose } from "react-icons/md";
import VerificationInput from "react-verification-input";
import { FindAccount, UpdatePassword } from "../../../api";
import Swal from "sweetalert2";
import Loader from "../Loading/Loader";
import { StepOne, StepTwo, StepThree } from "./Steps";
import { ToastContainer, toast } from "react-toastify";
function ForgotPassword(props) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [animation, setAnimation] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef(null);
  const newPassword = useRef(null);
  const confirmPassword = useRef(null);

  const handleBack = () => {
    if (step > 1) {
      setAnimation("back");
      setStep((step) => step - 1);
    }
  };

  const handleNext = async () => {
    if (step < 3) {
      if (step === 1) {
        if (/\b@buksu\.edu\.ph\b/.test(emailRef.current.value)) {
          try {
            setIsLoading(true);
            const email = emailRef.current.value;
            const response = await FindAccount({ email });
            if (response.status === 200) {
              localStorage.setItem("email", email);
              setIsLoading(false);
              setAnimation("next");
              setStep((step) => step + 1);
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
            }
          } catch (err) {
            Swal.fire({
              icon: "error",
              text: err.response.data.message,
            });
          } finally {
            setIsLoading(false);
          }
        } else {
          Swal.fire({
            icon: "error",
            text: "Invalid Email address!",
          });
        }
      }
      if (step === 2) {
        setStep((step) => step + 1);
      }
    }
  };
  const handleUpdatePassword = async () => {
    const email = localStorage.getItem("email");
    if (newPassword.current.value != confirmPassword.current.value) {
      Swal.fire({
        icon: "error",
        text: "Passwords did not match!",
      });
      return;
    }
    if (newPassword.current.value === "") {
      Swal.fire({
        icon: "error",
        text: "Please complete the form!",
      });
      return;
    }
    const password = newPassword.current.value;
    const credentials = { email, password };
    try {
      const response = await UpdatePassword(credentials);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Congratulations",
          text: response.data.message,
        }).then(() => {
          localStorage.removeItem("email");
          props.setTriggerForgotPassword(false);
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        text: err.response.data.message,
      });
    }
  };
  const Content = ({ step }) => {
    const RenderContent = useMemo(() => {
      switch (step) {
        case 1:
          return <StepOne animation={animation} email={emailRef} />;
        case 2:
          return <StepTwo animation={animation} handleNext={handleNext} />;
        case 3:
          return (
            <StepThree
              animation={animation}
              newPassword={newPassword}
              confirmPassword={confirmPassword}
            />
          );
        default:
          return <StepOne animation={animation} setEmail={updateEmail} />;
      }
    }, [step]);
    return <>{RenderContent}</>;
  };
  return (
    <div className={styles.container}>
      {isLoading ? <Loader backgroundColor="#0000001e" /> : ""}
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
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <p>Forgot password</p>
          <MdClose
            fontSize="1.2em"
            cursor="pointer"
            onClick={() => props.setTriggerForgotPassword(false)}
          />
        </div>
        <div className={styles.progressContainer}>
          <Progress step={step} totalSteps={totalSteps} />
          <div
            className={
              step >= 1
                ? `${styles.circle} ${styles.active}`
                : `${styles.circle}`
            }
          >
            1
          </div>
          <div
            className={
              step >= 2
                ? `${styles.circle} ${styles.active}`
                : `${styles.circle}`
            }
          >
            2
          </div>
          <div
            className={
              step >= 3
                ? `${styles.circle} ${styles.active}`
                : `${styles.circle}`
            }
          >
            3
          </div>
        </div>
        <Content step={step} />
        <div className={styles.buttonContainer}>
          <button
            className={
              step > 1 && step !== 3
                ? `${styles.button}`
                : `${styles.button}  ${styles.disabled}`
            }
            onClick={handleBack}
            disabled={step === 3}
          >
            Back
          </button>
          <button
            className={
              step === 2
                ? `${styles.button}  ${styles.disabled}`
                : `${styles.button} `
            }
            disabled={step === 2}
            onClick={step !== 3 ? handleNext : handleUpdatePassword}
          >
            {step === 3 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;
