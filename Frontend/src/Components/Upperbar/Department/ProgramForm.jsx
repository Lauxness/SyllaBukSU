import styles from "./style.module.css";
import { AddDepartment } from "../../../api";
import { useState } from "react";
import Swal from "sweetalert2";
import { GetCourse } from "../../../Values/Courses";
function ProgramForm() {
  const [program, setProgram] = useState("");
  const [department, setDepartment] = useState("");
  const [college, setCollege] = useState("");
  const [courses, setCourses] = useState([]);

  const handleCollegeChange = (e) => {
    const college = e.target.value;
    setCollege(college);
    const programs = GetCourse(college);
    setCourses(programs);
  };

  const handleAddProgram = async () => {
    const data = localStorage.getItem("user-info");
    const userInfo = JSON.parse(data);
    const email = userInfo.email;
    if (program === "" || department === "" || college == "") {
      return Swal.fire({
        title: "Error",
        text: "Please fill out the form.",
        icon: "error",
        background: "#202020",
        color: "white",
      });
    }

    try {
      const res = await AddDepartment(email, {
        program: program,
        department: department,
        college: college,
      });

      if (res.status === 200) {
        userInfo.program = program;
        localStorage.setItem("user-info", JSON.stringify(userInfo));
        Swal.fire({
          title: "Success",
          text: res.data.message,
          icon: "success",
          background: "#202020",
          color: "white",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.data.message,
        icon: "error",
        background: "#202020",
        color: "white",
      });
      console.log(err);
    }
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>Please fill out the form to continue.</p>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="college">College</label>
          <select name="college" onChange={(e) => handleCollegeChange(e)}>
            <option value="">-</option>
            <option value="College of Technology">College of Technology</option>
            <option value="College of Business">College of Business</option>
            <option value="College of Public Administration and Governance">
              College of Public Administration and Governance
            </option>
            <option value="College of Nursing">College of Nursing</option>
            <option value="College of Education">College of Education</option>
            <option value="College of Arts and Sciences">
              College of Arts and Sciences
            </option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="department">Department</label>
          <select
            name="department"
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">-</option>
            <option value="IT Department">IT Department</option>
            <option value="">BSEMC</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="program">Program</label>
          <select name="program" onChange={(e) => setProgram(e.target.value)}>
            <option value="">-</option>{" "}
            {courses.map((program, index) => (
              <option key={index} value={program}>
                {program}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.buttonContainer}>
          <button
            onClick={handleAddProgram}
            style={{ backgroundColor: "#2663ff" }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProgramForm;
