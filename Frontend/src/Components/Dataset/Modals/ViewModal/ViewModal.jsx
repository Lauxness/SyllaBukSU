import { useState } from "react";
import { MdOutlineClose, MdSave } from "react-icons/md";
import styles from "./style.module.css";
function ViewModal(props) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>View dataset</p>
          <MdOutlineClose
            fontSize={25}
            cursor={"pointer"}
            onClick={props.HandleViewDataset}
          />
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.component}>
            <p>Component name:</p>
            <p>{props.data?.component}</p>
          </div>
          <hr />
          <div className={styles.dataset}>
            <p>Input: </p>
            <p>{props.data?.input}</p>
          </div>

          <div className={styles.dataset}>
            <p>Output: </p>
            <p>{props.data?.output}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewModal;
