import { useState } from "react";
import { MdOutlineClose, MdSave } from "react-icons/md";
import Swal from "sweetalert2";
import styles from "./style.module.css";
import { TiPlus } from "react-icons/ti";
import { AddDataset, UpdateDataset } from "../../../../api";
function AddModal(props) {
  const [component, setComponent] = useState(
    props.currentData?.component || ""
  );
  const [input, setInput] = useState(props.currentData?.input || "");
  const [output, setOutput] = useState(props.currentData?.output || "");

  const HandleAddDataset = async () => {
    const body = { component, input, output };
    try {
      const res = props.currentData
        ? await UpdateDataset(body, props.currentData?._id)
        : await AddDataset(body);
      if (res.status === 200) {
        Swal.fire({
          text: res.data.message,
          title: "Success",
          background: "#202020",

          color: "white",
          icon: "success",
        }).then(() => {
          props.HandleGetDatasets();
          props.HandleTriggerAddModal();
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>Add new dataset</p>
          <MdOutlineClose
            fontSize={25}
            cursor={"pointer"}
            onClick={props.HandleTriggerAddModal}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="title">Component</label>
          <select
            name=""
            id=""
            value={component}
            onChange={(e) => setComponent(e.target.value)}
            className={styles.select}
          >
            <option value="">Select a component</option>
            <option value="Course description">Course description</option>
            <option value="Course outcomes">Course outcomes</option>
            <option value="Specific learning outcomes">
              Specific learning outcomes
            </option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="input">Input</label>
          <textarea
            type="text"
            value={input}
            placeholder="example: Course name, Course description"
            className={styles.textarea}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="body">Output</label>
          <textarea
            type="text"
            value={output}
            placeholder="example: Course description, Course outcomes "
            className={styles.textarea}
            onChange={(e) => setOutput(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button
            onClick={HandleAddDataset}
            style={{ backgroundColor: "#2663ff" }}
          >
            {props.currentData ? (
              <>
                <MdSave fontSize={15} /> Update dataset
              </>
            ) : (
              <>
                <TiPlus fontSize={15} /> Add dataset
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
