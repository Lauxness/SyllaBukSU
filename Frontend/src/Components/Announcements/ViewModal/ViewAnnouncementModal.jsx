import Swal from "sweetalert2";
import { DeleteAnnouncement } from "../../../api";
import styles from "./style.module.css";
import { MdOutlineClose, MdEdit, MdDelete } from "react-icons/md";

function ViewAnnouncementModal(props) {
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
          <p>
            {props.currentAnnouncementView.body}
            dfsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </p>
        </div>
        <div className={styles.info}>
          <p>{props.currentAnnouncementView.views} views</p>
          <p>
            {new Date(props.currentAnnouncementView.publishedAt).toLocaleString(
              "en-US",
              {
                dateStyle: "long",
                timeStyle: "short",
                timeZone: "Asia/Manila",
              }
            )}
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <button>
            <MdEdit fontSize={15} /> Edit
          </button>
          <button onClick={showSwal}>
            <MdDelete fontSize={15} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewAnnouncementModal;
