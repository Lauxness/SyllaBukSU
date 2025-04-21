import styles from "./style.module.css";
import Logo from "../../../assets/Logo.png";
import LandingIllustration from "../../../assets/LandingIllustration.png";
import { useEffect, useState } from "react";

function Home() {
  const [navBar, setNavBar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 70) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);
  return (
    <>
      <div className={styles.container}>
        <div
          className={
            navBar ? `${styles.header} ${styles.active}` : `${styles.header}`
          }
        >
          <div className={styles.logoContainer}>
            <img src={Logo} alt="" width={50} />
            <p>SyllaBukSU</p>
          </div>
          <div className={styles.navigations}>
            <a href="#">Home</a>
            <a href="#">Services</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="/login">Login</a>
          </div>
        </div>
        <div
          className={styles.contentContainer}
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-duration="500"
        >
          <div className={styles.content}>
            <p>Effortless Syllabus Content Creation</p>
            <div className={styles.imageContainer}>
              <img src={LandingIllustration} alt="" />
            </div>
            <p>
              Say goodbye to the hassle of manually creating syllabi! Our
              AI-powered Syllabus assistant helps educators, trainers, and
              institutions build structured, comprehensive syllabi in just a few
              clicks.
            </p>
          </div>
          <button className={styles.startButton}>Get Started</button>
        </div>
      </div>
    </>
  );
}

export default Home;
