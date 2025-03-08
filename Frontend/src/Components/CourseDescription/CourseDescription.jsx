import styles from "./style.module.css";
import { TypingEffect } from "../../../Utilities/TypingEffect";
import { useState } from "react";
import Swal from "sweetalert2";
import { GenerateDescription } from "../../api";
import Loader from "../Modals/Loading/Loader";

function CourseDescription() {
  const [courseName, setCourseName] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!courseName || courseName.length < 5) {
      return Swal.fire({
        icon: "error",
        title: "Invalid input",
        text: "Please make sure the input is valid.",
      });
    }
    setResult("");
    try {
      setIsLoading(true);
      const response = await GenerateDescription({ courseName });
      console.log("API Response:", response.data);

      if (response.status === 200) {
        const text = response.data.result;
        setResult(text);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.inputGroup}>
          <label>
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
        <button className={styles.generateButton} onClick={handleGenerate}>
          Generate
        </button>
        <div id="generatedContent" className={styles.generatedContent}>
          {isLoading ? (
            <div className={styles.loaderContainer}>
              <Loader />{" "}
            </div>
          ) : (
            ""
          )}
          {result ? (
            <>
              <p>❖ Course Description</p>
              <div>
                <TypingEffect text={result} key={result} />
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

export default CourseDescription;
