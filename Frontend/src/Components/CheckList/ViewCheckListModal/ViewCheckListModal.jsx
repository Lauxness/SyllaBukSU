import Swal from "sweetalert2";
import styles from "./style.module.css";
import { MdOutlineClose, MdSave, MdDelete } from "react-icons/md";
import { useState } from "react";
import {
  DeleteCheckList,
  GetOneCheckList,
  UpdateChecklist,
} from "../../../api";

function ViewCheckListModal({ checkList, handleTriggerView }) {
  const [formatAndHouseStylesPart, setFormatAndHouseStylePart] = useState(
    checkList?.formatAndHouseStylesPart
  );
  const [
    coherenceAndLogicalConnectionPart,
    setCoherenceAndLogicalConnectionPart,
  ] = useState(checkList?.coherenceAndLogicalConnectionPart);
  const [behavioralVerbsPart, setBehavioralVerbsPart] = useState(
    checkList?.behavioralVerbsPart
  );
  const [gradationOfOutComesPart, setGradationOfOutComesPart] = useState(
    checkList?.gradationOfOutComesPart
  );
  const [supplementaryDocumentationPart, setSupplementaryDocumentationPart] =
    useState(checkList?.gradationOfOutComesPart);
  const [institutionalFormsPart, setinstitutionalFormsPart] = useState(
    checkList?.institutionalFormsPart
  );
  const formatAndHouseStyle = [
    "Format: Use template prescribed by the university.",
    "Structure: Present content logical sections.",
    "Font Style: Use Book Antiqua.",
    "Font Size: Headings: 12 pt.",
    "Font Size: Main text (page 1): 9 pt.",
    "Font Size: Main text (succeeding pages): 11 pt.",
    "Line Spacing: Apply single space throughout the document.",
  ];
  const coherenceAndLogicalConnection = [
    "Coherence and logical connection between CO and SLO.",
    "Coherence and logical connection between CO and PAO.",
    "Coherence and logical connection between CO and IAS.",
    "Coherence and logical connection between CO and ICT.",
    "Coherence and logical connection between SLO and IAS.",
    "Coherence and logical connection between SLO and ICT.",
  ];
  const behavioralVerbs = [
    "All Course Outcomes (COs) must begin with behavioral verbs (e.g. demonstrate, analyze, evaluate, formulate).",
    "Specific Learning Outcomes (SLOs) should be precise, observable.",
  ];

  const gradationOfOutComes = [
    "Hierarchical COs arranged in increasing level of complexity.",
    "Overarching COS that encapsulate the SLOs.",
    "SLOs in increasing complexity(Foundational, Mediating, Terminal/Ultimate).",
  ];

  const supplementaryDocumentation = [
    "Revision history: Indicating the month and year of the previous revision(s) and the complete date of the present revision.",
    "Proper signatories (lead faculty, department head, dean, CITL director, and VPAA.",
    "Name(s) and signature(s) of syllabus author(s) responsible for present Revision.",
    "Complete and consistent reference list using APA 7th edition guidelines.",
  ];

  const institutionalFormsLabels = [
    "Form 17 -Syllabus Review Checklis.t",
    "Form 18-1-Syllabus Suggestion and Action Taken Form.",
    "Justification Form – no affixed signature for lead faculty.",
  ];

  const handleCheckListDelete = async () => {
    const id = props.checkListId;

    try {
      const res = await DeleteCheckList(id);
      if (res.status === 200) {
        Swal.fire({
          title: "Success",
          text: res.data.message,
          background: "#202020",
          color: "white",
          icon: "success",
        }).then(() => window.location.reload());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveCheckList = async () => {
    const courseName = checkList.courseName;
    const id = checkList._id;
    const data = {
      courseName,
      formatAndHouseStylesPart,
      behavioralVerbsPart,
      gradationOfOutComesPart,
      supplementaryDocumentationPart,
      institutionalFormsPart,
      coherenceAndLogicalConnectionPart,
    };
    try {
      const res = await UpdateChecklist(id, data);

      if (res.status === 200) {
        Swal.fire({
          title: "Success",
          text: res.data.message,
          icon: "success",
          background: "#202020",
          color: "white",
        }).then(() => window.location.reload());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showSwal = () => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete this checklist?",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      background: "#202020",
      color: "white",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleCheckListDelete();
      }
    });
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p>Syllabus Check list</p>
            <MdOutlineClose
              fontSize={25}
              cursor={"pointer"}
              onClick={handleTriggerView}
            />
          </div>
          <div className={styles.titleContainer}>
            <p>Networking 1</p>
            <div className={styles.buttonContainer}>
              <button onClick={handleSaveCheckList}>
                <MdSave size={15} />
                Save
              </button>
              <button onClick={showSwal}>
                <MdDelete size={15} />
                Delete
              </button>
            </div>
          </div>
          <div className={styles.checkListContainer}>
            <div className={styles.rowContainer}>
              <div className={styles.leftCheckList}>
                <p>A. Format and House Style</p>
                <p>
                  Ensure that the syllabus document adheres to the prescribed
                  stylistic and formatting conventions, as outlined in Form
                  17-Review Checklist.
                </p>
                {formatAndHouseStyle.map((item, index) => {
                  return (
                    <div key={index} className={styles.inputGroup}>
                      <input
                        type="checkbox"
                        id={`checkbox-${index}`}
                        checked={formatAndHouseStylesPart?.[index] !== 0}
                        onChange={() => {
                          const updated = [...formatAndHouseStylesPart];
                          updated[index] = updated[index] === 1 ? 0 : 1;
                          setFormatAndHouseStylePart(updated);
                        }}
                      />
                      <label htmlFor={`checkbox-${index}`}>{item}</label>
                    </div>
                  );
                })}
              </div>
              <div className={styles.rightCheckList}>
                <p>
                  B. Check Coherence and logical connection between components
                  in the learning plan{" "}
                </p>
                <p>
                  [Course Outcome (CO), Specific Learning Outcome (SLO),
                  Performance Assessment Output (PAO), Innovative Approaches and
                  Strategies (IAS), and (ICT) Tools and Resources].
                </p>
                {coherenceAndLogicalConnection.map((item, index) => {
                  return (
                    <div key={index} className={styles.inputGroup}>
                      <input
                        type="checkbox"
                        id={`checkbox-${index}`}
                        checked={
                          coherenceAndLogicalConnectionPart?.[index] !== 0
                        }
                        onChange={() => {
                          const updated = [
                            ...coherenceAndLogicalConnectionPart,
                          ];
                          updated[index] = updated[index] === 1 ? 0 : 1;
                          setCoherenceAndLogicalConnectionPart(updated);
                        }}
                      />
                      <label htmlFor={`checkbox-${index}`}>{item}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.rowContainer}>
              <div className={styles.leftCheckList}>
                <p>C. Use of Behavioral Verbs based on Bloom’s Taxonomy</p>
                <p>
                  Ensure that outcomes are measurable and performance-based.{" "}
                </p>
                {behavioralVerbs.map((item, index) => {
                  return (
                    <div key={index} className={styles.inputGroup}>
                      <input
                        type="checkbox"
                        id={`checkbox-${index}`}
                        checked={behavioralVerbsPart?.[index] !== 0}
                        onChange={() => {
                          const updated = [...behavioralVerbsPart];
                          updated[index] = updated[index] === 1 ? 0 : 1;
                          setBehavioralVerbsPart(updated);
                        }}
                      />
                      <label htmlFor={`checkbox-${index}`}>{item}</label>
                    </div>
                  );
                })}
              </div>
              <div className={styles.rightCheckList}>
                <p>D. Gradation of Outcomes</p>
                <p>
                  Verify that outcomes follow a clear hierarchical structure:
                </p>
                {gradationOfOutComes.map((item, index) => {
                  return (
                    <div key={index} className={styles.inputGroup}>
                      <input
                        type="checkbox"
                        id={`checkbox-${index}`}
                        checked={gradationOfOutComesPart?.[index] !== 0}
                        onChange={() => {
                          const updated = [...gradationOfOutComesPart];
                          updated[index] = updated[index] === 1 ? 0 : 1;
                          setGradationOfOutComesPart(updated);
                        }}
                      />
                      <label htmlFor={`checkbox-${index}`}>{item}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.rowContainer}>
              <div className={styles.leftCheckList}>
                <p>E. Supplementary Documentation</p>
                <p>Ascertain the following:</p>
                {supplementaryDocumentation.map((item, index) => {
                  return (
                    <div key={index} className={styles.inputGroup}>
                      <input
                        type="checkbox"
                        id={`checkbox-${index}`}
                        checked={supplementaryDocumentationPart?.[index] !== 0}
                        onChange={() => {
                          const updated = [...supplementaryDocumentationPart];
                          updated[index] = updated[index] === 1 ? 0 : 1;
                          setSupplementaryDocumentationPart(updated);
                        }}
                      />
                      <label htmlFor={`checkbox-${index}`}>{item}</label>
                    </div>
                  );
                })}
              </div>
              <div className={styles.rightCheckList}>
                <p>F. Inclusion of Institutional Forms</p>
                <p>Check the following reviewed and filled forms:</p>
                {institutionalFormsLabels.map((item, index) => {
                  return (
                    <div key={index} className={styles.inputGroup}>
                      <input
                        type="checkbox"
                        id={`checkbox-${index}`}
                        checked={institutionalFormsPart?.[index] !== 0}
                        onChange={() => {
                          const updated = [...institutionalFormsPart];
                          updated[index] = updated[index] === 1 ? 0 : 1;
                          setinstitutionalFormsPart(updated);
                        }}
                      />
                      <label htmlFor={`checkbox-${index}`}>{item}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewCheckListModal;
