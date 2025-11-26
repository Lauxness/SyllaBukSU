import React from "react";
import DataTable, { createTheme } from "react-data-table-component";
createTheme(
  "customTheme",
  {
    text: {
      primary: "white",
      secondary: "#2663ff",
    },
    background: {
      default: "rgba(0, 0, 0, 0)",
    },
    context: {
      background: "#2663ff",
      text: "#FFFFFF",
    },
    divider: {
      default: "rgba(255, 255, 255, 0.04)",
    },
    button: {
      default: "#2aa198",
      hover: "rgba(0,0,0,.08)",
      focus: "rgba(255,255,255,.12)",
      disabled: "rgba(255, 255, 255, .34)",
    },
    sortFocus: {
      default: "#2aa198",
    },
  },
  "dark"
);

const UserTable = ({ users, title, columns, height }) => (
  <DataTable
    title={title}
    columns={columns}
    data={users}
    theme="customTheme"
    pagination
    fixedHeaderScrollHeight={height || "500px"}
  />
);

export default UserTable;
