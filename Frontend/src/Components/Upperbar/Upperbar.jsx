import { MdMenu } from "react-icons/md";
import ProfileSample from "../../assets/pfpTest.webp";
function Upperbar(props) {
  const data = localStorage.getItem("user-info");
  const userInfo = JSON.parse(data);
  console.log("SDJKHFJKDSHFKJSDHFJKDS", userInfo.email);
  const collapseHandler = () => {
    console.log("asdhfkjahsfkjsadfj");
    if (props.collapsed) {
      props.setIsCollapsed(false);
    } else {
      props.setIsCollapsed(true);
    }
  };
  return (
    <div
      style={{
        borderBottom: "1px solid #ababab",
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        padding: " 5px",
        marginBottom: "5px",
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
          color="#2d55fb"
          onClick={collapseHandler}
          cursor="pointer"
        />
        <p
          style={{
            fontSize: "20px",
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
        <div style={{ textAlign: "end", fontSize: "12px" }}>
          <p style={{ textTransform: "capitalize" }}>
            <span style={{ fontWeight: "bold" }}>
              {" "}
              {userInfo?.role || "Guest"}
            </span>{" "}
            , {userInfo?.name || "Guest"}
          </p>
          <p>{userInfo?.email || "No email available"}</p>
        </div>
        <div style={{ padding: "0", height: "35px" }}>
          <img
            src={userInfo?.profilePicture || ProfileSample}
            alt=""
            width="35px"
            style={{ height: "100%", borderRadius: "50%" }}
          />
        </div>
      </div>
    </div>
  );
}
export default Upperbar;
