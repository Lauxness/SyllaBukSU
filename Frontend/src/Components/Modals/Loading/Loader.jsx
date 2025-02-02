import { BeatLoader } from "react-spinners";
import styles from "./style.module.css";
function Loader() {
  return (
    <div className={styles.container}>
      <BeatLoader color="#0656ff" />
    </div>
  );
}
export default Loader;
