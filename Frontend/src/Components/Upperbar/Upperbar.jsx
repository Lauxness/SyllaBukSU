import { MdMenu } from "react-icons/md";
import ProfileSample from "../../assets/pfpTest.webp";
import ProgramForm from "./Department/ProgramForm";
function Upperbar(props) {
  const data = localStorage.getItem("user-info");
  const userInfo = JSON.parse(data);
  const collapseHandler = () => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    console.log(savedState);
    if (!savedState || savedState === null || savedState === "false") {
      localStorage.setItem("sidebarCollapsed", true);
      props.setIsSidebarCollapsed(true);
    } else {
      localStorage.setItem("sidebarCollapsed", false);
      props.setIsSidebarCollapsed(false);
      console.log("sadkhfjaksdf");
    }
  };
  return (
    <>
      <div
        style={{
          borderBottom: "1px solid rgba(38, 99, 255, 0.3)",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          padding: " 10px 8px",
          marginBottom: "2px",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            gap: "20px",
            marginLeft: "15px",
            flex: "1",
          }}
        >
          <MdMenu
            fontSize="30px"
            color="var(--text-color)"
            onClick={collapseHandler}
            cursor="pointer"
          />
          <p
            style={{
              fontSize: "20px",
              color: "var(--text-color)",
              fontWeight: "500",
            }}
          >
            {props.currentPage}
          </p>
        </div>
        <div
          style={{
            width: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            paddingRight: "10px",
            gap: "10px",
            paddingBottom: "6px",
          }}
        >
          <div
            style={{
              textAlign: "end",
              fontSize: "12px",
              color: "var(--text-color)",
            }}
          >
            <p style={{ textTransform: "capitalize" }}>
              <span style={{ fontWeight: "bold" }}>
                {userInfo?.role || "Guest"}
              </span>
              , {userInfo?.name || "Guest"}
            </p>
            <p>{userInfo?.email || "No email available"}</p>
          </div>
          <div
            style={{ padding: "0", height: "35px", cursor: "pointer" }}
            onClick={() => props.setTriggerProfile(true)}
          >
            <img
              src={userInfo?.profilePicture || ProfileSample}
              alt=""
              width="35px"
              style={{ height: "100%", borderRadius: "50%" }}
            />
          </div>
        </div>
      </div>
      {!userInfo?.program && <ProgramForm />}
    </>
  );
}
export default Upperbar;
