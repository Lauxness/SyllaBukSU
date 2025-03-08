import { BeatLoader } from "react-spinners";
import styles from "./style.module.css";
function Loader(props) {
  return (
    <div
      className={styles.container}
      style={{ background: props.backgroundColor }}
    >
      <BeatLoader color="#0656ff" />
    </div>
  );
}
export default Loader;
