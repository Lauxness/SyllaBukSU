import styles from "./style.module.css";
import { TypingEffect } from "../../../Utilities/TypingEffect";
import { useState } from "react";
import Swal from "sweetalert2";
import { GenerateAll, GenerateDescription } from "../../api";
function AllInOne() {
  const [courseName, setCourseName] = useState("");
  const [coNumber, setCONumber] = useState();
  const [sloNumber, setSLONumber] = useState();
  const [result, setResult] = useState();
  const handleGenerate = async () => {
    if (!courseName || courseName.length < 5) {
      return Swal.fire({
        icon: "error",
        title: "Invalid input",
        text: "Please make sure the input is valid.",
      });
    }
    if (!coNumber) {
      return Swal.fire({
        icon: "error",
        title: "Invalid input",
        text: "Please make sure the input is valid.",
      });
    }
    if (!sloNumber) {
      return Swal.fire({
        icon: "error",
        title: "Invalid input",
        text: "Please make sure the input is valid.",
      });
    }
    setResult(null);
    const data = { coNumber, sloNumber, courseName };
    try {
      const response = await GenerateAll({ data });
      if (response.status === 200) {
        const text = response.data.result;
        setResult(text);
        console.log(text);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
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
          {result ? (
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
              <div>
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
              <div>
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
              <div>
                <TypingEffect text={result.learningOutcomes?.join("\n")} />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default AllInOne;
