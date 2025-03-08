import React, { useState } from "react";
import styles from "./style.module.css";
import Swal from "sweetalert2";
import { GenerateCourseOutcomes } from "../../api";
import { TypingEffect } from "../../../Utilities/TypingEffect";
import Loader from "../Modals/Loading/Loader";
function CourseOutcomes() {
  const [courseDescription, setCourseDescription] = useState("");
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleGenerate = async () => {
    if (courseDescription.length < 10) {
      return Swal.fire({
        icon: "error",
        title: "Invalid input",
        text: "Please make sure the course description is at least 10 characters long.",
      });
    }

    if (!number || number <= 0) {
      return Swal.fire({
        icon: "error",
        title: "Invalid number",
        text: "Please select a valid number greater than 0.",
      });
    }
    setResult(null);
    const input = { courseDescription, number };

    try {
      setIsLoading(true);
      const response = await GenerateCourseOutcomes(input);

      if (response.status === 200 && response.data.result) {
        console.log(response.data.result);
        setResult(response.data.result);
      } else {
        Swal.fire({
          icon: "error",
          title: "Generation Failed",
          text: "Failed to generate course outcomes. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while generating course outcomes.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="">❖ Enter the course description below.</label>
          <input
            type="text"
            placeholder="Course description"
            onChange={(e) => setCourseDescription(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="">❖ Specify the number of course outcomes.</label>
          <select onChange={(e) => setNumber(e.target.value)}>
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
              <Loader />{" "}
            </div>
          ) : (
            ""
          )}
          {result ? (
            <>
              <p>❖ Course Outcomes</p>
              <div>
                <TypingEffect text={result.join("\n")} />
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

export default CourseOutcomes;
