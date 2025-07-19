import styles from "./style.module.css";
import { TypingEffect } from "../../../Utilities/TypingEffect";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { GenerateAll, GetPrompt, SavePrompt } from "../../api";
import { MdArrowForward, MdSettings, MdCopyAll, MdCheck } from "react-icons/md";
import Loader from "../Modals/Loading/Loader";

function AllInOne() {
  const [courseName, setCourseName] = useState("");
  const [coNumber, setCONumber] = useState();
  const [sloNumber, setSLONumber] = useState();
  const [result, setResult] = useState();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [copied, setCopied] = useState({ type: null, index: null });
  const handleGenerate = async () => {
    if (!courseName || courseName.length < 5) {
      return Swal.fire({
        icon: "error",
        title: "Invalid input",
        background: "#202020",
        color: "white",
        text: "Please make sure the input is valid.",
      });
    }
    if (!coNumber) {
      return Swal.fire({
        icon: "error",
        title: "Invalid input",
        background: "#202020",
        color: "white",
        text: "Please make sure the input is valid.",
      });
    }
    if (!sloNumber) {
      return Swal.fire({
        icon: "error",
        title: "Invalid input",
        background: "#202020",
        color: "white",
        text: "Please make sure the input is valid.",
      });
    }
    setResult(null);
    const data = { coNumber, sloNumber, courseName };
    try {
      setIsLoading(true);
      const response = await GenerateAll({ data });
      if (response.status === 200) {
        const text = response.data.result;
        setResult(text);
        console.log(text);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        RequestLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      handleGetPrompt(id);
    } else {
      setResult();
      setCourseName("");
    }
  }, [id]);
  const handleGetPrompt = async () => {
    try {
      const response = await GetPrompt(id);

      if (response.status === 200) {
        const data = response.data;

        setResult(data.originalResult);
        setCourseName(data.topic);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const RequestLogout = () => {
    Swal.fire({
      icon: "error",
      title: "Unauthorized",
      background: "#202020",
      color: "white",
      text: "Your Session Expired. Please Login again",
    }).then(() => {
      localStorage.removeItem("user-info");
      navigate("/");
    });
  };
  const handleCopy = (text, type, index = null) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied({ type, index });
        setTimeout(() => setCopied({ type: null, index: null }), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const HandleSavePrompt = async () => {
    const variant = "All in One";
    try {
      const response = await SavePrompt({
        variant,
        topic: courseName,
        originalResult: result,
        currentResult: result,
      });
      if (response.status === 200) {
        Swal.fire({
          text: "Prompt has been successfully saved.",
          title: "Success",
          icon: "success",
          background: "#202020",
          color: "white",
        });
      }
    } catch (err) {
      Swal.fire({
        text: "Prompt failed to save!",
        title: "Error",
        icon: "error",
        background: "#202020",
        color: "white",
      });
    }
  };
  return (
    <div
      className={styles.container}
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
      data-aos-duration="500"
    >
      <div className={styles.contentContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="">
            ❖ Enter the course name in the field below. Ensure it reflects the
            subject and purpose of the course accurately.
          </label>
          <input
            type="text"
            placeholder="Course name"
            onChange={(e) => setCourseName(e.target.value)}
          />
          <p>Example: Data Structures and Algorithms</p>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="">❖ Specify the number of course outcomes.</label>
          <select onChange={(e) => setCONumber(e.target.value)}>
            <option value="">-</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="">
            ❖ Specify the number of specific learning outcomes.
          </label>
          <select onChange={(e) => setSLONumber(e.target.value)}>
            <option value="">-</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <button className={styles.generateButton} onClick={handleGenerate}>
          Generate
        </button>
        <div id="generatedContent" className={styles.generatedContent}>
          {isLoading ? (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          ) : null}
          {result && (
            <>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "1.125rem",
                  marginBottom: "0.5rem",
                }}
              >
                ❖ Course Description
              </p>
              <div className={styles.resultContainer}>
                <div
                  className={styles.copyToClipBoard}
                  onClick={() => handleCopy(result.description, "description")}
                  style={{ cursor: "pointer" }}
                >
                  {copied.type === "description" ? (
                    <MdCheck fontSize="20px" color="green" />
                  ) : (
                    <MdCopyAll fontSize="20px" />
                  )}
                </div>
                <TypingEffect text={result.description} />
              </div>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "1.125rem",
                  marginTop: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                ❖ Course Outcomes
              </p>
              <div className={styles.resultContainer}>
                <div
                  className={styles.copyToClipBoard}
                  onClick={() =>
                    handleCopy(result.courseOutcomes, "courseOutcomes")
                  }
                  style={{ cursor: "pointer" }}
                >
                  {copied.type === "courseOutcomes" ? (
                    <MdCheck fontSize="20px" color="green" />
                  ) : (
                    <MdCopyAll fontSize="20px" />
                  )}
                </div>
                <TypingEffect text={result.courseOutcomes?.join("\n")} />
              </div>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "1.125rem",
                  marginTop: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                ❖ Specific Learning Outcomes
              </p>
              <div className={styles.resultContainer}>
                <div
                  className={styles.copyToClipBoard}
                  onClick={() =>
                    handleCopy(result.learningOutcomes, "learningOutcomes")
                  }
                  style={{ cursor: "pointer" }}
                >
                  {copied.type === "learningOutcomes" ? (
                    <MdCheck fontSize="20px" color="green" />
                  ) : (
                    <MdCopyAll fontSize="20px" />
                  )}
                </div>
                <TypingEffect text={result.learningOutcomes?.join("\n")} />
              </div>
            </>
          )}
          {result && (
            <div className={styles.buttonContainer}>
              <button onClick={() => HandleSavePrompt()}>Save</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllInOne;
