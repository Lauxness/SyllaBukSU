import { useState } from "react";
import BukSuLogo from "../../assets/Logo.png";

import style from "./style.module.css";

function Header() {
  return (
    <>
      <div className={style.heading}>
        <div className={style.projectName}>
          <img src={BukSuLogo} alt="BukSU logo" width={45} />
          <p>SyllaBukSU</p>
        </div>
      </div>
    </>
  );
}
export default Header;
