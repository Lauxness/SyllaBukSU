import Announcements from "../Components/Announcements/Announcement";
import SidebarComponent from "../Components/Sidebar/sideBar";
import Proflle from "../Components/Profile/Proflle";

import Upperbar from "../Components/Upperbar/Upperbar";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
function AnnouncementPage() {
  const savedState = localStorage.getItem("sidebarCollapsed");
  const [triggerProfile, setTriggerProfile] = useState(false);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    JSON.parse(savedState) || false
  );

  useEffect(() => {
    if (savedState !== null) {
      setIsSidebarCollapsed(JSON.parse(savedState));
    } else {
      setIsSidebarCollapsed(false);
    }
    Aos.init();
  }, []);
  return (
    <>
      {triggerProfile && <Proflle setTriggerProfile={setTriggerProfile} />}
      <Upperbar
        currentPage="Announcements"
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
        <SidebarComponent
          currentPage="announcements"
          collapsed={isSidebarCollapsed}
        />
        <Announcements />
      </div>
    </>
  );
}

export default AnnouncementPage;
