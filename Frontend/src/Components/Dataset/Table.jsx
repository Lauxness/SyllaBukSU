import React from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { MdDelete, MdEdit } from "react-icons/md";

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

const Table = ({
  data,
  HandleTriggerAddModal,
  HandleWarning,
  HandleViewDataset,
}) => {
  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Component",
      selector: (row) => row.component,
      sortable: true,
    },
    {
      name: "Date added",
      selector: (row) =>
        new Date(row.createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={() => HandleTriggerAddModal(row)}
            style={{
              backgroundColor: "#027928ca",
              width: "90px",
              padding: "7px",
              borderRadius: "2px",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "poppins",
              gap: "5px",
              border: "none",
            }}
          >
            <MdEdit size={15} />
            Edit
          </button>

          <button
            onClick={() => HandleWarning(row._id)}
            style={{
              backgroundColor: "#d21919ca",
              width: "90px",
              padding: "7px",
              borderRadius: "2px",
              color: "white",
              display: "flex",
              fontFamily: "poppins",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              cursor: "pointer",
              border: "none",
            }}
          >
            <MdDelete size={15} />
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "20%",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      theme="customTheme"
      highlightOnHover
      onRowClicked={HandleViewDataset}
      pointerOnHover
      pagination
      fixedHeader
      fixedHeaderScrollHeight="500px"
    />
  );
};

export default Table;
