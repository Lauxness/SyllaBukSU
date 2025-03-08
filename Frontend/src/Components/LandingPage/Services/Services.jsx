import React from "react";
import styles from "./style.module.css";
import TimeSaving from "../../../assets/Time-saving.png";
import Customize from "../../../assets/Customizable.png";
import AiAssistant from "../../../assets/AiPowered Assistant.png";
import UserFriendly from "../../../assets/UserFriendly.png";

function Services() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <p>Why use SyllaBukSU?</p>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.content}>
            <p>Time-Saving</p>
            <div className={styles.imageContainer}>
              <img src={TimeSaving} alt="" />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Fusce auctor, nunc vel feugiat vehicula, ligula orci
              interdum elit,
            </p>
          </div>
          <button>Discover</button>
        </div>
        <div className={styles.card}>
          <div className={styles.content}>
            <p>Customizable</p>
            <div className={styles.imageContainer}>
              <img src={Customize} alt="" />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Fusce auctor, nunc vel feugiat vehicula, ligula orci
              interdum elit,
            </p>
          </div>
          <button>Discover</button>
        </div>
        <div className={styles.card}>
          <div className={styles.content}>
            <p>Ai Powered Assistant</p>
            <div className={styles.imageContainer}>
              <img src={AiAssistant} alt="" />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Fusce auctor, nunc vel feugiat vehicula, ligula orci
              interdum elit,
            </p>
          </div>
          <button>Discover</button>
        </div>
        <div className={styles.card}>
          <div className={styles.content}>
            <p>User Friendly Interface</p>
            <div className={styles.imageContainer}>
              <img src={UserFriendly} alt="" />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Fusce auctor, nunc vel feugiat vehicula, ligula orci
              interdum elit,
            </p>
          </div>
          <button>Discover</button>
        </div>
        <div className={styles.card}>
          <div className={styles.content}>
            <p>User Friendly Interface</p>
            <div className={styles.imageContainer}>
              <img src={UserFriendly} alt="" />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Fusce auctor, nunc vel feugiat vehicula, ligula orci
              interdum elit,
            </p>
          </div>
          <button>Discover</button>
        </div>
        <div className={styles.card}>
          <div className={styles.content}>
            <p>User Friendly Interface</p>
            <div className={styles.imageContainer}>
              <img src={UserFriendly} alt="" />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Fusce auctor, nunc vel feugiat vehicula, ligula orci
              interdum elit,
            </p>
          </div>
          <button>Discover</button>
        </div>
        <div className={styles.card}>
          <div className={styles.content}>
            <p>User Friendly Interface</p>
            <div className={styles.imageContainer}>
              <img src={UserFriendly} alt="" />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Fusce auctor, nunc vel feugiat vehicula, ligula orci
              interdum elit,
            </p>
          </div>
          <button>Discover</button>
        </div>
        <div className={styles.card}>
          <div className={styles.content}>
            <p>User Friendly Interface</p>
            <div className={styles.imageContainer}>
              <img src={UserFriendly} alt="" />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Fusce auctor, nunc vel feugiat vehicula, ligula orci
              interdum elit,
            </p>
          </div>
          <button>Discover</button>
        </div>
      </div>
    </div>
  );
}

export default Services;
