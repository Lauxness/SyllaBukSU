import { useState } from "react";
import { MdOutlineClose, MdSave } from "react-icons/md";
import Swal from "sweetalert2";
import styles from "./style.module.css";
import { TiPlus } from "react-icons/ti";
import { CreateAdminAccount } from "../../../../api";
function AddAdminAccountModal(props) {
  const [role, setRole] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState();

  const HandleSubmitAccount = async (e) => {
    e.preventDefault();
    const body = { email, role, college };

    try {
      const res = await CreateAdminAccount(body);
      if (res.status === 200) {
        Swal.fire({
          title: "Success",
          text: res.data.message,
          icon: "success",
          background: "#202020",
          color: "white",
        }).then(() => props.setTriggerAddAccountModal(false));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <form className={styles.container} onSubmit={HandleSubmitAccount}>
        <div className={styles.header}>
          <p>Add new admin account</p>
          <MdOutlineClose
            fontSize={25}
            cursor={"pointer"}
            onClick={() => props.setTriggerAddAccountModal(false)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="title">Role</label>
          <select
            name=""
            id=""
            required
            value={role}
            className={styles.select}
            onChange={(e) => {
              setRole(e.target.value);
              if (e.target.value === "admin") {
                setCollege("");
              }
            }}
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="college-admin">College Admin</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="title">College</label>
          <select
            name=""
            id=""
            required={role !== "admin"}
            disabled={role === "admin"}
            value={college}
            className={styles.select}
            onChange={(e) => setCollege(e.target.value)}
          >
            <option value="">Select college</option>
            <option value="COB">College of Business</option>
            <option value="CPAG">
              College of Public Administration and Governance
            </option>
            <option value="COE">College of Education</option>
            <option value="CON">College of Nursing</option>
            <option value="CAS">College of Arts and Sciences</option>
            <option value="COT">College of Technology</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="input">Email address</label>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@buksu.edu.ph"
            className={styles.textarea}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" style={{ backgroundColor: "#2663ff" }}>
            <TiPlus fontSize={15} /> Submit account
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAdminAccountModal;
