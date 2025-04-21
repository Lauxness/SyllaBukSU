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
const data = [
  { name: "Rey ANthony Rojo", email: "qwerqwer@gmail.com", role: "admin" },
  { name: "Rey ANthony Rojo", email: "qwerqwer@gmail.com", role: "admin" },
  { name: "Rey ANthony Rojo", email: "qwerqwer@gmail.com", role: "admin" },
  { name: "Rey ANthony Rojo", email: "qwerqwer@gmail.com", role: "admin" },
  { name: "Rey ANthony Rojo", email: "qwerqwer@gmail.com", role: "admin" },
  { name: "Rey ANthony Rojo", email: "qwerqwer@gmail.com", role: "admin" },
  { name: "Rey ANthony Rojo", email: "qwerqwer@gmail.com", role: "admin" },
  { name: "Rey ANthony Rojo", email: "qwerqwer@gmail.com", role: "admin" },
  { name: "Rey ANthony Rojo", email: "qwerqwer@gmail.com", role: "admin" },
  { name: "Rey ANthony Rojo", email: "qwerqwer@gmail.com", role: "admin" },
  { name: "Rey ANthony Rojo", email: "qwerqwer@gmail.com", role: "admin" },
];

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Role",
    selector: (row) => row.role,
    sortable: true,
  },
];

const UserTable = ({ users }) => (
  <DataTable
    title="User List"
    columns={columns}
    data={users}
    theme="customTheme"
    selectableRows
    pagination
  />
);

export default UserTable;
