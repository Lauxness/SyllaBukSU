import { useState } from "react";
import { AddAnnouncement, UpdateAnnouncement } from "../../../api";
import { MdOutlineClose, MdOutlinePostAdd } from "react-icons/md";
import Swal from "sweetalert2";
import styles from "./style.module.css";
function PostAnnouncementModal(props) {
  const [title, setTitle] = useState(props.title || "");
  const [body, setBody] = useState(props.body || "");
  const handlePost = async () => {
    let response;

    const form = { title, body, isEmail: false };

    try {
      if (props.body) {
        response = await UpdateAnnouncement(props.id, form);
      } else {
        const action = await Swal.fire({
          text: "Do you want to send this announcement to all users' email?",
          icon: "question",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          showCancelButton: true,
          showCloseButton: true,
          background: "#202020",
          color: "white",
        });

        if (action.isConfirmed) {
          form.isEmail = true;
          response = await AddAnnouncement(form);
        } else if (action.dismiss === Swal.DismissReason.cancel) {
          form.isEmail = false;
          response = await AddAnnouncement(form);
        } else {
          console.log(
            "Swal was closed or dismissed unexpectedly. No action taken."
          );
          return;
        }
      }
      if (response?.status === 200) {
        Swal.fire({
          title: "Success",
          text: response.data.message || "Announcement saved!",
          background: "#202020",
          icon: "success",
          color: "white",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Something Went Wrong!",
        background: "#202020",
        icon: "error",
        color: "white",
      });
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>Post new announcement</p>
          <MdOutlineClose
            fontSize={25}
            cursor={"pointer"}
            onClick={props.handleTrigger}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="title">Title</label>
          <textarea
            value={title}
            style={{ maxHeight: "40px" }}
            className={styles.textarea}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="body">Body</label>
          <textarea
            value={body}
            className={styles.textarea}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={handlePost} style={{ backgroundColor: "#2663ff" }}>
            <MdOutlinePostAdd fontSize={15} />
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostAnnouncementModal;
