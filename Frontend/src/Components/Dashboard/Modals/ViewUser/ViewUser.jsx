import { useState } from "react";
import Swal from "sweetalert2";
import styles from "./style.module.css";
import { MdOutlineClose } from "react-icons/md";
import SamplePfp from "../../../../assets/pfpTest.webp";
function ViewUser(props) {
  console.log(props.user);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>User profile</p>
          <MdOutlineClose
            fontSize={25}
            cursor={"pointer"}
            onClick={props.handleViewTrigger}
          />
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.imageContainer}>
              <img src={SamplePfp} alt="profile" width={100} />
              <p>{props.user.user.name}</p>
            </div>
            <div className={styles.infoContainer}>
              <p>
                Email: <span>{props.user.user.email}</span>
              </p>
              <p>
                Program: <span>{props.user.user.program || "N/A"}</span>
              </p>
              <p>
                Department: <span>{props.user.user.department || "N/A"}</span>
              </p>
              <p>
                College: <span>{props.user.user.college || "N/A"}</span>
              </p>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <p className={styles.title}>User Activities</p>
            <div className={styles.cardContainer}>
              {props.user.activities?.map((activity, index) => (
                <div className={styles.card} key={index}>
                  <div className={styles.desc}>
                    <p>{activity.action}</p>
                    <p>{activity.component}</p>
                  </div>
                  <div>
                    Performed at{" "}
                    {new Date(activity.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
