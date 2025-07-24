import SidebarComponent from "../Components/Sidebar/sideBar";
import CourseDescription from "../Components/CourseDescription/CourseDescription";
import Upperbar from "../Components/Upperbar/Upperbar";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Proflle from "../Components/Profile/Proflle";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { GetAnnouncement } from "../api";
function DescPage() {
  const navigate = useNavigate();
  const savedState = localStorage.getItem("sidebarCollapsed");
  const [triggerProfile, setTriggerProfile] = useState(false);

  const [annoucements, setAnnouncements] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    JSON.parse(savedState) || false
  );
  const handleGetAnnoucements = async () => {
    try {
      const response = await GetAnnouncement();

      if (response.status === 200) {
        setAnnouncements(response.data);
      }
    } catch (err) {
      Swal.fire({
        title: "Failed to fetch",
        text: err.response.data.message,
        background: "#202020",
        icon: "error",
        color: "white",
      });
      console.log(err);
    }
  };
  useEffect(() => {
    Aos.init();
    handleGetAnnoucements();
  }, []);

  return (
    <>
      {triggerProfile && <Proflle setTriggerProfile={setTriggerProfile} />}
      <Upperbar
        currentPage="Generate a course description"
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        setTriggerProfile={setTriggerProfile}
      />

      <div
        style={{
          height: "calc(100vh - 63px)",
          width: "100vw",
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: -1,
            width: "400px",
            height: "400px",
            left: "-10%",
            top: "80%",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(80, 182, 255, 0.16)",
              height: "100%",
              width: "100%",
              borderRadius: "50%",
              boxShadow: "0 0 100px 100px rgba(80,182,255,0.16)",
            }}
          ></div>
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: -1,
            width: "200px",
            height: "200px",
            right: "-10%",
            top: "-10%",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(80, 182, 255, 0.16)",
              height: "100%",
              width: "100%",
              borderRadius: "50%",
              boxShadow: "0 0 100px 100px rgba(80,182,255,0.16)",
            }}
          ></div>
        </div>
        <SidebarComponent currentPage="desc" collapsed={isSidebarCollapsed} />
        <div style={{ width: "100%", height: "100%" }}>
          {annoucements.length > 0 && (
            <div
              style={{
                marginTop: "10px",
                padding: "0px 20px",
                gap: "5px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate("/announcements")}
            >
              <div style={{ fontSize: "20px" }}>📢</div>
              <marquee
                behavior="scroll"
                direction="left"
                style={{ color: "white", width: "100%" }}
              >
                {`${annoucements[annoucements.length - 1].title}: ${
                  annoucements[annoucements.length - 1].body
                }`}
              </marquee>
            </div>
          )}
          <CourseDescription />
        </div>
      </div>
    </>
  );
}
export default DescPage;
