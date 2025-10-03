import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import BukSuLogo from "../../assets/Logo.png";
import {
  MdLogout,
  MdDescription,
  MdSettingsInputComponent,
  MdPsychology,
  MdAnnouncement,
  MdGridView,
  MdDashboard,
  MdChecklist,
  MdHelp,
} from "react-icons/md";
import Swal from "sweetalert2";
function SidebarComponent(props) {
  const data = localStorage.getItem("user-info");
  const userInfo = JSON.parse(data);
  const navigate = useNavigate();
  const showSwal = () => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to Logout?",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      background: "#202020",
      color: "white",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    navigate("/");
  };
  return (
    <Sidebar
      width="300px"
      style={{
        height: "100%",
        borderRight: "1px solid rgba(38, 99, 255, 0.3)",
        padding: "0px",
        margin: "0px",
        backgroundColor: "hsla(223, 100.00%, 57.50%, 0.09)",
      }}
      collapsed={props.collapsed}
      backgroundColor="transparent"
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            if (level === 1 || level === 0) {
              return {
                borderRight: active && level === 0 ? "3px solid #2d55fb" : "",
                backgroundColor:
                  active || (active && level === 1)
                    ? "rgba(45, 85, 251, 0.2 )"
                    : undefined,
                "&:hover": {
                  backgroundColor: "rgba(45, 85, 251, 0.3)",
                  color: "#2d55fb",
                  transition: "0.3s ease-in-out",
                },
              };
            }
          },
        }}
      >
        {userInfo?.role === "admin" ? (
          <MenuItem
            active={props.currentPage === "dashboard"}
            component={<Link to="/dashboard" />}
            style={{ color: "var(--text-color)" }}
            icon={<MdDashboard color="var(--text-color)" fontSize="20px" />}
          >
            Dashboard
          </MenuItem>
        ) : (
          ""
        )}
        <MenuItem
          active={props.currentPage === "desc"}
          component={<Link to="/generate_description" />}
          style={{ color: "var(--text-color)" }}
          icon={<MdDescription color="var(--text-color)" fontSize="20px" />}
        >
          Course Description
        </MenuItem>
        <MenuItem
          style={{ color: "var(--text-color)" }}
          active={props.currentPage === "cos"}
          component={<Link to="/generate_cos" />}
          icon={
            <MdSettingsInputComponent
              color="var(--text-color)"
              fontSize="20px"
            />
          }
        >
          Course Outcomes
        </MenuItem>
        <MenuItem
          style={{ color: "var(--text-color)" }}
          active={props.currentPage === "slos"}
          component={<Link to="/generate_slos" />}
          icon={<MdPsychology color="var(--text-color)" fontSize="20px" />}
        >
          Specific LOs
        </MenuItem>
        <MenuItem
          style={{ color: "var(--text-color)" }}
          active={props.currentPage === "allinone"}
          component={<Link to="/generate_all" />}
          icon={<MdGridView color="var(--text-color)" fontSize="20px" />}
        >
          Generate all in one
        </MenuItem>
        <MenuItem
          style={{ color: "var(--text-color)" }}
          active={props.currentPage === "announcements"}
          component={<Link to="/announcements" />}
          icon={<MdAnnouncement color="var(--text-color)" fontSize="20px" />}
        >
          Annoucements
        </MenuItem>
        <MenuItem
          style={{ color: "var(--text-color)" }}
          active={props.currentPage === "checklist"}
          component={<Link to="/checklist" />}
          icon={<MdChecklist color="var(--text-color)" fontSize="20px" />}
        >
          Checklist
        </MenuItem>
        <MenuItem
          style={{ color: "var(--text-color)" }}
          active={props.currentPage === "guides"}
          component={<Link to="/guides" />}
          icon={<MdHelp color="var(--text-color)" fontSize="20px" />}
        >
          Guides
        </MenuItem>

        <MenuItem
          style={{ color: "var(--text-color)" }}
          onClick={showSwal}
          icon={<MdLogout color="var(--text-color)" fontSize="20px" />}
        >
          Logout
        </MenuItem>
      </Menu>
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          src={BukSuLogo}
          alt="Logo"
          style={{ width: "40px", height: "auto" }}
        />
        {!props.collapsed && (
          <p
            style={{
              fontSize: "1.3em",
              fontWeight: 500,
              color: "var(--text-color)",
            }}
          >
            SyllaBukSU
          </p>
        )}
      </div>
    </Sidebar>
  );
}

export default SidebarComponent;
