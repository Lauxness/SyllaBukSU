import { useState } from "react";

import Swal from "sweetalert2";
import styles from "./style.module.css";
import { MdOutlineClose } from "react-icons/md";
import UserTable from "../../tables/UsersTable";
import ViewUser from "../ViewUser/ViewUser";
import { GetUser } from "../../../../api";
function Users(props) {
  const [isViewTriggered, setIsViewTriggered] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const handleViewTrigger = async (user) => {
    if (isViewTriggered) {
      setIsViewTriggered(false);
      setCurrentUser({});
    } else {
      try {
        const res = await GetUser(user._id);
        if (res.status === 200) {
          setCurrentUser(res.data);
          setIsViewTriggered(true);
        }
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };
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
      name: "Status",
      selector: (row) =>
        row.activeUntil && new Date(row.activeUntil) > new Date()
          ? "Active"
          : "Inactive",
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => handleViewTrigger(row)}
          style={{
            background: "none",
            border: "none",
            color: "#1976d2",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          View
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p>User List</p>
            <MdOutlineClose
              fontSize={25}
              cursor={"pointer"}
              onClick={props.handleTrigger}
            />
          </div>
          <div className={styles.tableContainer}>
            <UserTable users={props.users} title="" columns={columns} />
          </div>
        </div>
      </div>
      {isViewTriggered && (
        <ViewUser user={currentUser} handleViewTrigger={handleViewTrigger} />
      )}
    </>
  );
}

export default Users;
