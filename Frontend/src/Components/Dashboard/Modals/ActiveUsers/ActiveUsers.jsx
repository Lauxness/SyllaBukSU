import { useState } from "react";

import Swal from "sweetalert2";
import styles from "./style.module.css";
import { MdOutlineClose } from "react-icons/md";
import UserTable from "../../tables/UsersTable";
function ActiveUsers(props) {
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
      name: "Program",
      selector: (row) => row.program || "N/A",
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => "View",
      sortable: true,
    },
  ];

  console.log(props.users);
  const activeUsers = props.users
    ? props.users.filter(
        (user) => user.activeUntil && new Date(user.activeUntil) > new Date()
      )
    : [];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>Active User List</p>
          <MdOutlineClose
            fontSize={25}
            cursor={"pointer"}
            onClick={props.handleTrigger}
          />
        </div>
        <div className={styles.tableContainer}>
          <UserTable users={activeUsers} title="" columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default ActiveUsers;
