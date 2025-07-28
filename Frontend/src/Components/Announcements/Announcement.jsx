import { useEffect, useState } from "react";
import { GetOneAnnouncement, GetAnnouncement } from "../../api";
import Swal from "sweetalert2";
import styles from "./style.module.css";
import PostAnnouncementModal from "./PostModal/PostAnnouncementModal";
import ViewAnnouncementModal from "./ViewModal/ViewAnnouncementModal";
import { TiPlus } from "react-icons/ti";

function Announcements() {
  const [annoucements, setAnnouncements] = useState([]);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isViewTriggered, setIsViewTriggered] = useState(false);
  const [currentAnnouncementView, setCurrentAnnouncementView] = useState({});
  const data = localStorage.getItem("user-info");
  const userInfo = JSON.parse(data);

  const handleTrigger = () => {
    if (isTriggered) {
      setIsTriggered(false);
    } else {
      setIsTriggered(true);
    }
  };
  const handleTriggerView = async (current) => {
    const data = current;
    if (isViewTriggered) {
      setCurrentAnnouncementView({});
      setIsViewTriggered(false);
    } else {
      try {
        const res = await GetOneAnnouncement(data._id);
        if (res.status === 200) {
          setCurrentAnnouncementView(res.data);
          setIsViewTriggered(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleGetAnnoucements = async () => {
    try {
      const response = await GetAnnouncement();

      if (response.status === 200) {
        setAnnouncements(response.data);
        console.log(response.data);
      }
    } catch (err) {
      Swal.fire({
        title: "Failed to fetch",
        text: err.response.data.message,
        background: "#202020",
        icon: "error",
        color: "white",
      }).then(() => {
        if (err.response.status === 401) {
          localStorage.removeItem("user-info");

          window.location.reload();
        }
      });
      console.log(err);
    }
  };
  useEffect(() => {
    handleGetAnnoucements();
  }, []);

  return (
    <>
      {isTriggered === true ? (
        <PostAnnouncementModal handleTrigger={handleTrigger} />
      ) : (
        ""
      )}
      {isViewTriggered === true ? (
        <ViewAnnouncementModal
          handleTriggerView={handleTriggerView}
          currentAnnouncementView={currentAnnouncementView}
        />
      ) : (
        ""
      )}

      <div className={styles.container}>
        {userInfo.role === "admin" ? (
          <div>
            <button onClick={() => handleTrigger()} className={styles.button}>
              <TiPlus fontSize={15} />
              Post
            </button>
          </div>
        ) : (
          ""
        )}
        <div className={styles.cardContainer}>
          {annoucements.length > 0 ? (
            annoucements.map((item, index) => (
              <div
                key={index}
                className={styles.card}
                onClick={() => handleTriggerView(item)}
              >
                <p>{item.title}</p>
                <div>
                  <p>
                    {item.body.length > 100
                      ? item.body.slice(0, 50) + "..."
                      : item.body}
                  </p>
                  <p>
                    {new Date(item.createdAt).toLocaleString("en-US", {
                      dateStyle: "long",
                      timeStyle: "short",
                      timeZone: "Asia/Manila",
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "gray" }}>No announcements available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Announcements;
