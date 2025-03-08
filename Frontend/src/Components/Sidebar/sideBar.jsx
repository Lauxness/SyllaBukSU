import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import {
  MdLogout,
  MdPerson3,
  MdDescription,
  MdSettingsInputComponent,
  MdPsychology,
  MdGridView,
} from "react-icons/md";
import "./style.css";
import Swal from "sweetalert2";

function SidebarComponent(props) {
  const navigate = useNavigate();

  const showSwal = () => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to Logout?",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
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
      style={{ height: "100%" }}
      collapsed={props.collapsed}
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            if (level === 1 || level === 0) {
              return {
                borderRight: active && level === 0 ? " 3px solid #2d55fb" : "",
                backgroundColor:
                  active || (active && level === 1)
                    ? "rgba(45, 85, 251, 0.2 )"
                    : undefined,
              };
            }
          },
        }}
      >
        <MenuItem
          active={props.currentPage === "desc"}
          component={<Link to="/generate_description" />}
          icon={<MdDescription color="#2d55fb" fontSize="20px" />}
        >
          Course Description
        </MenuItem>
        <MenuItem
          active={props.currentPage === "cos"}
          component={<Link to="/generate_cos" />}
          icon={<MdSettingsInputComponent color="#2d55fb" fontSize="20px" />}
        >
          Course Outcomes
        </MenuItem>
        <MenuItem
          active={props.currentPage === "slos"}
          component={<Link to="/generate_slos" />}
          icon={<MdPsychology color="#2d55fb" fontSize="20px" />}
        >
          Specific LOs
        </MenuItem>
        <MenuItem
          active={props.currentPage === "allinone"}
          component={<Link to="/generate_all" />}
          icon={<MdGridView color="#2d55fb" fontSize="20px" />}
        >
          Generate all in one
        </MenuItem>

        <MenuItem
          onClick={showSwal}
          icon={<MdLogout color="#2d55fb" fontSize="20px" />}
        >
          Logout
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SidebarComponent;
