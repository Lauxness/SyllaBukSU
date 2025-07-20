import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Swal from "sweetalert2";
import {
  ChatBot,
  GenerateCourseOutcomes,
  GetPrompt,
  SavePrompt,
} from "../../api";
import { TypingEffect } from "../../../Utilities/TypingEffect";
import Loader from "../Modals/Loading/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowForward, MdSettings, MdCopyAll, MdCheck } from "react-icons/md";
function CourseOutcomes() {
  const [courseDescription, setCourseDescription] = useState("");
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState();
  const [userPrompt, setUserPrompt] = useState();
  const [allUserPrompts, setAllUserPrompts] = useState([]);
  const [chatResponses, setChatResponses] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [chatLoading, setChatLoading] = useState(false);
  const [copied, setCopied] = useState({ type: null, index: null });
  const handleGenerate = async () => {
    if (courseDescription.length < 10) {
      return Swal.fire({
        icon: "error",
        title: "Invalid input",
        background: "#202020",
        color: "white",
        text: "Please make sure the course description is at least 10 characters long.",
      });
    }

    if (!number || number <= 0) {
      return Swal.fire({
        icon: "error",
        title: "Invalid number",
        background: "#202020",
        color: "white",
        text: "Please select a valid number greater than 0.",
      });
    }
    setResult(null);
    setChatResponses([]);
    setAllUserPrompts([]);
    const input = { courseDescription, number };

    try {
      setIsLoading(true);
      const response = await GenerateCourseOutcomes(input);

      if (response.status === 200 && response.data.result) {
        setResult(response.data.result);
        setCurrentResult(response.data.result);
      } else {
        Swal.fire({
          icon: "error",
          title: "Generation Failed",
          background: "#202020",
          color: "white",
          text: "Failed to generate course outcomes. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      if (err.response.status === 401) {
        RequestLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };
  const RequestLogout = () => {
    Swal.fire({
      icon: "error",
      title: "Unauthorized",
      background: "#202020",
      color: "white",
      text: "Your Session Expired. Please Login again",
    }).then(() => {
      localStorage.removeItem("user-info");
      navigate("/");
    });
  };
  const handleCopy = (text, type, index = null) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied({ type, index });
        setTimeout(() => setCopied({ type: null, index: null }), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const HandleSavePrompt = async () => {
    const variant = "course Outcomes";
    try {
      const response = await SavePrompt({
        variant,
        topic: courseDescription,
        originalResult: result,
        currentResult: currentResult,
        customizedResult: chatResponses,
        chatPrompts: allUserPrompts,
      });
      if (response.status === 200) {
        Swal.fire({
          text: "Prompt has been successfully saved.",
          title: "Success",
          icon: "success",
          background: "#202020",
          color: "white",
        });
      }
    } catch (err) {
      Swal.fire({
        text: "Prompt failed to save!",
        title: "Error",
        icon: "error",
        background: "#202020",
        color: "white",
      });
    }
  };
  useEffect(() => {
    if (id) {
      handleGetPrompt(id);
    } else {
      setCurrentResult("");
      setResult("");
      setAllUserPrompts([]);
      setCourseDescription("");
      setChatResponses([]);
    }
  }, [id]);
  const handleGetPrompt = async () => {
    try {
      const response = await GetPrompt(id);

      if (response.status === 200) {
        const data = response.data;
        setCurrentResult(data.currentResult);
        setResult(data.originalResult);
        setAllUserPrompts(data.chatPrompts);
        setCourseDescription(data.topic);
        setChatResponses(data?.customizedResults || []);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChat = async () => {
    if (!userPrompt) return;
    try {
      setChatLoading(true);
      const response = await ChatBot({ userPrompt, currentResult });
      const newResult = response.data.data.choices[0].message.content;

      setCurrentResult(newResult);
      setChatResponses((prevResponses) => [...prevResponses, newResult]);

      setAllUserPrompts((prevPrompts) => [...prevPrompts, userPrompt]);
      setUserPrompt("");
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        RequestLogout();
      }
    } finally {
      setChatLoading(false);
    }
  };
  const splitByNumbers = (text) => {
    return text.split(/(?=\d+\.\s)/g); // Looks ahead for number + period + space
  };

  return (
    <div
      className={styles.container}
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
      data-aos-duration="500"
    >
      <div className={styles.contentContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="">❖ Enter the course description below.</label>
          <input
            type="text"
            placeholder="Course description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="">❖ Specify the number of course outcomes.</label>
          <select onChange={(e) => setNumber(e.target.value)}>
            <option value="">-</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button className={styles.generateButton} onClick={handleGenerate}>
          Generate
        </button>
        <div id="generatedContent" className={styles.generatedContent}>
          {isLoading ? (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          ) : null}
          {result && (
            <>
              <p>❖ Course Outcomes</p>
              <div className={styles.resultContainer}>
                <div
                  className={styles.copyToClipBoard}
                  onClick={() => handleCopy(result, "result")}
                  style={{ cursor: "pointer" }}
                >
                  {copied.type === "result" ? (
                    <MdCheck fontSize="20px" color="green" />
                  ) : (
                    <MdCopyAll fontSize="20px" />
                  )}
                </div>
                <TypingEffect text={result.join("\n")} key={result} />
              </div>
            </>
          )}
        </div>
        {chatResponses.map((chatResponse, index) => (
          <div key={index} className={styles.generatedContent}>
            <p>❖ Customized Course Outcomes {index + 1}</p>
            <div className={styles.resultContainer}>
              <div
                className={styles.copyToClipBoard}
                onClick={() => handleCopy(chatResponse, "chat", index)}
                style={{ cursor: "pointer" }}
              >
                {copied.type === "chat" && copied.index === index ? (
                  <MdCheck fontSize="20px" color="green" />
                ) : (
                  <MdCopyAll fontSize="20px" />
                )}
              </div>
              <TypingEffect
                key={`chat-${index}`}
                text={splitByNumbers(chatResponse).join("\n").trim()}
              />
            </div>
          </div>
        ))}
        {result && (
          <div className={styles.buttonContainer}>
            <button onClick={() => HandleSavePrompt()}>Save</button>
          </div>
        )}
      </div>
      <div className={styles.chatBotContainer}>
        <p>❖ Customize the result here.</p>
        <p>❖ Please be specific.</p>

        <div className={styles.chats}>
          {allUserPrompts.map((p, index) => (
            <div key={index}>
              <p>{p}</p>
            </div>
          ))}
        </div>

        <div className={styles.chatInputGroup}>
          <input
            type="text"
            placeholder="Chat here"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          />
          <span
            onClick={!chatLoading ? handleChat : null}
            style={{
              cursor: chatLoading ? "not-allowed" : "pointer",
              pointerEvents: chatLoading ? "none" : "auto",
            }}
          >
            {chatLoading ? (
              <MdSettings className={styles.loading} />
            ) : (
              <MdArrowForward />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseOutcomes;
