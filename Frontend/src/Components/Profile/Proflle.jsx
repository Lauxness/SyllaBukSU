import React, { useEffect, useState } from "react";
import ProfilePic from "../../assets/pfpTest.webp";
import coverPhoto from "../../assets/cover_photo.png";
import styles from "./style.module.css";
import {
  MdClose,
  MdCameraAlt,
  MdEdit,
  MdFileOpen,
  MdDelete,
  MdOpenInNew,
} from "react-icons/md";
import { GetPrompts, DeletePrompt } from "../../api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Proflle({ setTriggerProfile }) {
  const data = localStorage.getItem("user-info");
  const userInfo = JSON.parse(data);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setTriggerProfile(false);
    }, 200);
  };

  const getPrompts = async () => {
    try {
      const response = await GetPrompts();
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        setSavedPrompts(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPrompts();
  }, []);
  const handleViewPrompt = (p) => {
    const variant = p.variant;
    let path = "";

    switch (variant) {
      case "Course Description":
        path = `/generate_description/${p._id}`;
        break;
      case "course Outcomes":
        path = `/generate_cos/${p._id}`;
        break;
      case "Specific Learning Outcomes":
        path = `/generate_slos/${p._id}`;
        break;
      case "All in One":
        path = `/generate_all/${p._id}`;
        break;
      default:
        console.warn("Unknown topic:", variant);
        return;
    }
    setTriggerProfile(false);
    navigate(path);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      text: "Are you sure you want to Delete?",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      background: "#202020",
      color: "white",
      showCancelButton: true,
      showCloseButton: true,
    });

    if (result.isConfirmed) {
      try {
        const response = await DeletePrompt(id);
        if (response.status === 200) {
          Swal.fire({
            title: "Success",
            text: response.data.message,
            background: "#202020",
            icon: "success",
            color: "white",
          });
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          text: "Failed to delete prompt",
          background: "#202020",
          color: "white",
        });
      }
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div
        className={`${styles.profileContainer} ${
          isClosing ? styles.popOut : styles.popUp
        }`}
      >
        <div className={styles.profileHeader}>
          <p>Profile</p>
          <MdClose fontSize={30} onClick={handleClose} cursor="pointer" />
        </div>
        <div className={styles.profileBody}>
          <div className={styles.profile}>
            <div className={styles.background}></div>
            <div className={styles.profileOverView}>
              <div className={styles.imageContainer}>
                <div className={styles.iconContainer}>
                  <MdCameraAlt />
                </div>
                <img src={ProfilePic} alt="" />
              </div>
              <div>
                <p> {userInfo?.name || "Guest"}</p>
                <p>{userInfo?.email || "No email available"}</p>
              </div>
            </div>
          </div>
          <div className={styles.mainContent}>
            <div className={styles.saved}>
              <p>Saved Prompts</p>
              <div className={styles.savedList}>
                {savedPrompts.map((p, index) => (
                  <div className={styles.savedPrompt}>
                    <div className={styles.fileIconContainer}>
                      <MdFileOpen fontSize={40} />
                    </div>
                    <div className={styles.savedDetatails}>
                      <p>{p.variant}</p>
                      <p>
                        {p.topic?.length > 60
                          ? `${p.topic.slice(0, 60)}...`
                          : p.topic}
                      </p>
                    </div>
                    <a
                      onClick={() => handleViewPrompt(p)}
                      style={{ cursor: "pointer" }}
                      title="View"
                    >
                      <MdOpenInNew fontSize={23} />
                    </a>
                    <a
                      onClick={() => handleDelete(p._id)}
                      style={{ cursor: "pointer" }}
                      title="Delete"
                    >
                      <MdDelete fontSize={25} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Proflle;
