import { useState } from "react";
import {
  AddAnnouncement,
  AddCheckList,
  UpdateAnnouncement,
} from "../../../api";
import { MdOutlineClose } from "react-icons/md";
import Swal from "sweetalert2";
import styles from "./style.module.css";
import { TiPlus } from "react-icons/ti";
function AddCheckListModal(props) {
  const [courseName, setCourseName] = useState();
  const handleAddCheckList = async () => {
    if (!courseName) {
      Swal.fire({
        title: "Error",
        text: "Course name is required",
        background: "#202020",
        icon: "error",
        color: "white",
      });
    }
    try {
      const res = await AddCheckList({ courseName });
      if (res.status === 200) {
        Swal.fire({
          title: "Success",
          text: res.data.message || "Announcement saved!",
          background: "#202020",
          icon: "success",
          color: "white",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err,
        background: "#202020",
        icon: "error",
        color: "white",
      });
      console.error(err);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>Add new CheckList</p>
          <MdOutlineClose
            fontSize={25}
            cursor={"pointer"}
            onClick={props.handleTrigger}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="title">Course Name</label>
          <input
            value={courseName}
            style={{ maxHeight: "40px" }}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button
            onClick={handleAddCheckList}
            style={{ backgroundColor: "#2663ff" }}
          >
            <TiPlus fontSize={15} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCheckListModal;
