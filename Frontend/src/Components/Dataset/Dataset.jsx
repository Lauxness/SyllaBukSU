import { MdAdd, MdDownload } from "react-icons/md";
import styles from "./style.module.css";
import Table from "./Table";
import AddModal from "./Modals/AddModal/AddModal";
import { DeleteDataset, GetDatasets } from "../../api";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Dataset() {
  const [datasets, setDatasets] = useState();
  const [triggerAddModal, setTriggerAddModal] = useState(false);
  const [currentData, setCurrentData] = useState();
  const HandleGetDatasets = async () => {
    try {
      const res = await GetDatasets();

      if (res.status === 200) {
        console.log(res.data);
        setDatasets(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const HandleTriggerAddModal = (data) => {
    if (triggerAddModal) {
      setCurrentData("");
      setTriggerAddModal(false);
    } else {
      setCurrentData(data);
      setTriggerAddModal(true);
    }
  };

  const HandleWarning = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Confirm",
      text: "Are you sure you want remove this dataset?",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      background: "#202020",
      color: "white",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        HandleDeleteDataset(id);
      }
    });
  };

  const HandleDeleteDataset = async (id) => {
    try {
      const res = await DeleteDataset(id);
      if (res.status === 200) {
        Swal.fire({
          text: res.data.message,
          title: "Success",
          background: "#202020",

          color: "white",
          icon: "success",
        }).then(() => {
          HandleGetDatasets();
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    HandleGetDatasets();
  }, []);

  return (
    <>
      {triggerAddModal && (
        <AddModal
          HandleTriggerAddModal={HandleTriggerAddModal}
          HandleGetDatasets={HandleGetDatasets}
          currentData={currentData}
        />
      )}
      <div className={styles.container}>
        <div className={styles.headlines}>
          <p>List of datasets</p>
          <div>
            <button onClick={() => setTriggerAddModal(true)}>
              <MdAdd /> Add dataset
            </button>
            <button>
              <MdDownload /> Download datasets
            </button>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <Table
            data={datasets}
            HandleTriggerAddModal={HandleTriggerAddModal}
            HandleWarning={HandleWarning}
          />
        </div>
      </div>
    </>
  );
}
export default Dataset;
