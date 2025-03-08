import styles from "./style.module.css";
function Progress({ step, totalSteps }) {
  const progress = ((step - 1) / (totalSteps - 1)) * 100;
  return (
    <div className={styles.progress} style={{ width: `${progress}%` }}></div>
  );
}
export default Progress;
