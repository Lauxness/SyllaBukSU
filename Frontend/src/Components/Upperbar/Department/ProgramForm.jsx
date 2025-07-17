import styles from "./style.module.css";
import { AddDepartment } from "../../../api";
import { useState } from "react";
import Swal from "sweetalert2";
function ProgramForm() {
  const [program, setProgram] = useState("");
  const handleAddProgram = async () => {
    const data = localStorage.getItem("user-info");
    const userInfo = JSON.parse(data);
    const email = userInfo.email;

    try {
      const res = await AddDepartment(email, { program: program });

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
          <p>Please select a department to continue.</p>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="department">Department</label>
          <select
            name="department"
            onChange={(e) => setProgram(e.target.value)}
          >
            <option value="">-</option>
            <option value="BSIT">BSIT</option>
            <option value="BSEMC">BSEMC</option>
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
