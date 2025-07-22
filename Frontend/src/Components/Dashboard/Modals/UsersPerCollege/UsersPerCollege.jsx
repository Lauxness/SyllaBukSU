import { useState } from "react";
import Swal from "sweetalert2";
import styles from "./style.module.css";
import { MdDownload, MdOutlineClose } from "react-icons/md";
import BarChart from "./Charts/BarChart";
import { DownloadReport } from "../../../../api";
function UsersPerCollege(props) {
  const [data, setData] = useState();
  const CAS = [
    "BA-ECO",
    "BA-ENG",
    "BA-PL",
    "BA-PT",
    "BA-SOC",
    "BS-BIO",
    "BS-CD",
    "BS-DC",
    "BS-ES",
    "BS-MATH",
  ];

  const COB = ["BSA", "BSBA-FM", "BSHM"];

  const COE = ["BECEd", "BEEd", "BPEd", "BSEd"];
  const COT = ["BSAT", "BSET", "BSEMC", "BSFT", "BSIT"];

  const CPAG = ["BPA"];
  const CON = ["BSN"];

  const handleDownloadReport = async (college) => {
    switch (college) {
      case "CAS":
        setData([
          ["College", "Total Users"],
          ...CAS.map((course, i) => [course, props.userCountsPerCollege[0][i]]),
        ]);

        break;
      case "COB":
        setData([
          ["Course", "Total Users"],
          ...COB.map((course, i) => [course, props.userCountsPerCollege[1][i]]),
        ]);
        break;
      case "COE":
        setData([
          ["Course", "Total Users"],
          ...COE.map((course, i) => [course, props.userCountsPerCollege[2][i]]),
        ]);
        break;
      case "CON":
        setData([
          ["Course", "Total Users"],
          ...CON.map((course, i) => [course, props.userCountsPerCollege[3][i]]),
        ]);
        break;
      case "COT":
        setData([
          ["Course", "Total Users"],
          ...COT.map((course, i) => [course, props.userCountsPerCollege[4][i]]),
        ]);
        break;
      case "CPAG":
        setData([
          ["Course", "Total Users"],
          ...CPAG.map((course, i) => [
            course,
            props.userCountsPerCollege[5][i],
          ]),
        ]);
        break;
    }

    try {
      const response = await DownloadReport(data);
      console.log;
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to download report:", err);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>Users per college analytics</p>
          <MdOutlineClose
            fontSize={25}
            cursor={"pointer"}
            onClick={props.handleTriggerUsersPerCollege}
          />
        </div>
        <div className={styles.chartsContainer}>
          <div className={styles.chartCanvas}>
            <div className={styles.heading}>
              <p>COB users</p>
              <button onClick={() => handleDownloadReport("COB")}>
                <MdDownload size={15} color="white" />
              </button>
            </div>
            <div className={styles.chart}>
              <BarChart
                savedPrompts={props.savedPrompts}
                label={COB}
                data={props.userCountsPerCollege[1]}
              />
            </div>
          </div>
          <div className={styles.chartCanvas}>
            <div className={styles.heading}>
              <p>COT users</p>
              <button onClick={() => handleDownloadReport("COT")}>
                <MdDownload size={15} color="white" />
              </button>
            </div>
            <div className={styles.chart}>
              <BarChart
                savedPrompts={props.savedPrompts}
                label={COT}
                data={props.userCountsPerCollege[4]}
              />
            </div>
          </div>
          <div className={styles.chartCanvas}>
            <div className={styles.heading}>
              <p>COE users</p>
              <button onClick={() => handleDownloadReport("COE")}>
                <MdDownload size={15} color="white" />
              </button>
            </div>
            <div className={styles.chart}>
              <BarChart
                savedPrompts={props.savedPrompts}
                label={COE}
                data={props.userCountsPerCollege[2]}
              />{" "}
            </div>
          </div>
          <div className={styles.chartCanvas}>
            <div className={styles.heading}>
              <p>CPAG users</p>
              <button onClick={() => handleDownloadReport("CPAG")}>
                <MdDownload size={15} color="white" />
              </button>
            </div>
            <div className={styles.chart}>
              <BarChart
                savedPrompts={props.savedPrompts}
                label={CPAG}
                data={props.userCountsPerCollege[5]}
              />{" "}
            </div>
          </div>
          <div className={styles.chartCanvas}>
            <div className={styles.heading}>
              <p>CON users</p>
              <button onClick={() => handleDownloadReport("CON")}>
                <MdDownload size={15} color="white" />
              </button>
            </div>
            <div className={styles.chart}>
              <BarChart
                savedPrompts={props.savedPrompts}
                label={CON}
                data={props.userCountsPerCollege[3]}
              />
            </div>
          </div>
          <div className={styles.chartCanvas}>
            <div className={styles.heading}>
              <p>CAS users</p>
              <button onClick={() => handleDownloadReport("CAS")}>
                <MdDownload size={15} color="white" />
              </button>
            </div>
            <div className={styles.chart}>
              <BarChart
                savedPrompts={props.savedPrompts}
                label={CAS}
                data={props.userCountsPerCollege[0]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersPerCollege;
