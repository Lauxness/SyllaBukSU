import Swal from "sweetalert2";
import { DeleteAnnouncement } from "../../../api";
import styles from "./style.module.css";
import { MdOutlineClose, MdEdit, MdDelete } from "react-icons/md";
import PostAnnouncementModal from "../PostModal/PostAnnouncementModal";
import { useState } from "react";

function ViewAnnouncementModal(props) {
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const handleDelete = async () => {
    const id = props.currentAnnouncementView._id;
    try {
      const res = await DeleteAnnouncement(id);
      if (res.status === 200) {
        Swal.fire({
          title: "Success",
          text: res.data.message,
          background: "#202020",
          icon: "success",
          color: "white",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTriggerUpdate = () => {
    if (triggerUpdate) {
      setTriggerUpdate(false);
    } else {
      setTriggerUpdate(true);
    }
  };

  const showSwal = () => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete this announcement?",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      background: "#202020",
      color: "white",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      }
    });
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p>Announcement</p>
            <MdOutlineClose
              fontSize={25}
              cursor={"pointer"}
              onClick={props.handleTriggerView}
            />
          </div>
          <div className={styles.title}>
            <p>{props.currentAnnouncementView.title}</p>
          </div>
          <div className={styles.body}>
            <p>{props.currentAnnouncementView.body}</p>
          </div>
          <div className={styles.info}>
            <p>{props.currentAnnouncementView.views} views</p>
            <p>
              {new Date(
                props.currentAnnouncementView.publishedAt
              ).toLocaleString("en-US", {
                dateStyle: "long",
                timeStyle: "short",
                timeZone: "Asia/Manila",
              })}
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={handleTriggerUpdate}>
              <MdEdit fontSize={15} /> Edit
            </button>
            <button onClick={showSwal}>
              <MdDelete fontSize={15} />
              Delete
            </button>
          </div>
        </div>
      </div>
      {triggerUpdate === true ? (
        <PostAnnouncementModal
          handleTrigger={handleTriggerUpdate}
          title={props.currentAnnouncementView.title}
          body={props.currentAnnouncementView.body}
          id={props.currentAnnouncementView._id}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default ViewAnnouncementModal;
