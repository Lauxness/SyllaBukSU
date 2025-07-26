import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./style.module.css";
import { TiPlus } from "react-icons/ti";
import { GetCheckList, GetOneCheckList } from "../../api";
import AddCheckListModal from "./AddCheckListModal/AddCheckListModal";
import ViewCheckListModal from "./ViewCheckListModal/ViewCheckListModal";

function CheckList() {
  const [checkLists, setCheckLists] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [triggerView, setTriggerView] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetOneCheckList = async (id) => {
    if (!id) {
      return;
    }
    try {
      setIsLoading(true);
      const res = await GetOneCheckList(id);
      if (res.status === 200) {
        setCheckList(res.data);
        console.log(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTriggerView = (id) => {
    if (triggerView) {
      setTriggerView(false);
    } else {
      handleGetOneCheckList(id);
      setTriggerView(true);
    }
  };

  const handleTrigger = () => {
    if (trigger) {
      setTrigger(false);
    } else {
      setTrigger(true);
    }
  };
  const handleGetCheckList = async () => {
    try {
      const res = await GetCheckList();
      if (res.status === 200) {
        setCheckLists(res.data);
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        handleLogout();
      }
    }
  };
  const handleLogout = () => {
    Swal.fire({
      text: "Token expired, Login Again!",
      title: "Error",
      icon: "error",
      background: "#202020",
      color: "white",
    }).then(() => {
      localStorage.removeItem("user-info");

      window.location.reload();
    });
  };
  useEffect(() => {
    handleGetCheckList();
  }, []);

  return (
    <>
      {trigger && <AddCheckListModal handleTrigger={handleTrigger} />}
      {triggerView && !isLoading && (
        <ViewCheckListModal
          checkList={checkList}
          handleTriggerView={handleTriggerView}
        />
      )}

      <div className={styles.container}>
        <div>
          <button className={styles.button} onClick={handleTrigger}>
            <TiPlus fontSize={13} />
            Add
          </button>
        </div>
        <div className={styles.cardContainer}>
          {checkLists.length > 0 ? (
            checkLists.map((item, index) => (
              <div
                key={index}
                className={styles.card}
                onClick={() => handleTriggerView(item._id)}
              >
                <p>{item.courseName}</p>
                <p>
                  {new Date(item.createdAt).toLocaleString("en-US", {
                    dateStyle: "long",
                    timeStyle: "short",
                    timeZone: "Asia/Manila",
                  })}
                </p>
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

export default CheckList;
