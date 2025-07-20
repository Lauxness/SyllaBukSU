import { useState } from "react";
import Swal from "sweetalert2";
import styles from "./style.module.css";
import { MdOutlineClose } from "react-icons/md";
import BarChart from "./Charts/BarChart";
import { GetCourse } from "../../../../Values/Courses";
function UsersPerCollege(props) {
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
            <p>COB users</p>{" "}
            <div className={styles.chart}>
              <BarChart
                savedPrompts={props.savedPrompts}
                label={COB}
                data={props.userCountsPerCollege[1]}
              />
            </div>
          </div>
          <div className={styles.chartCanvas}>
            <p>COT users</p>{" "}
            <div className={styles.chart}>
              <BarChart
                savedPrompts={props.savedPrompts}
                label={COT}
                data={props.userCountsPerCollege[4]}
              />{" "}
            </div>
          </div>
          <div className={styles.chartCanvas}>
            <p>COE users</p>{" "}
            <div className={styles.chart}>
              <BarChart
                savedPrompts={props.savedPrompts}
                label={COE}
                data={props.userCountsPerCollege[2]}
              />{" "}
            </div>
          </div>
          <div className={styles.chartCanvas}>
            <p>CPAG users</p>{" "}
            <div className={styles.chart}>
              <BarChart
                savedPrompts={props.savedPrompts}
                label={CPAG}
                data={props.userCountsPerCollege[5]}
              />{" "}
            </div>
          </div>
          <div className={styles.chartCanvas}>
            <p>CON users</p>
            <div className={styles.chart}>
              <BarChart
                savedPrompts={props.savedPrompts}
                label={CON}
                data={props.userCountsPerCollege[3]}
              />
            </div>
          </div>
          <div className={styles.chartCanvas}>
            <p>CAS users</p>
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
