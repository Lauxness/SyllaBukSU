import styles from "./style.module.css";
import { TypingEffect } from "../../../Utilities/TypingEffect";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GenerateDescription, ChatBot, GetPrompt } from "../../api";
import Loader from "../Modals/Loading/Loader";
import { MdArrowForward, MdSettings, MdCopyAll, MdCheck } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { SavePrompt } from "../../api";
function CourseDescription() {
  const [courseName, setCourseName] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  const [currentResult, setCurrentResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [allUserPrompts, setAllUserPrompts] = useState([]);
  const [chatResponses, setChatResponses] = useState([]);
  const [copied, setCopied] = useState({ type: null, index: null });
  const [useTypingEffect, setUseTypingEffect] = useState(true);
  const [speed, setSpeed] = useState(10);

  const { id } = useParams();
  const handleGenerate = async () => {
    if (!courseName || courseName.length < 5) {
      return Swal.fire({
        icon: "error",
        title: "Invalid input",
        background: "#202020",
        color: "white",
        text: "Please make sure the input is valid.",
      });
    }
    setResult("");
    setChatResponses([]);
    setUseTypingEffect(true);
    try {
      setIsLoading(true);
      const response = await GenerateDescription({ courseName });
      console.log("API Response:", response.data);

      if (response.status === 200) {
        const text = response.data.result;
        setResult(text);
        setCurrentResult(text);
      }
    } catch (err) {
      console.log(err);
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
    const variant = "Course Description";
    console.log(chatResponses);
    try {
      const response = await SavePrompt({
        variant,
        topic: courseName,
        originalResult: result,
        currentResult: currentResult,
        customizedResults: chatResponses,
        chatPrompts: allUserPrompts,
      });
      if (response.status === 200) {
        Swal.fire("Success", "Prompt has been saved successfuly", "success");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to saved Prompt", " error");
    }
  };
  const handleChat = async () => {
    setUseTypingEffect(true);
    setSpeed(10);
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
  useEffect(() => {
    if (id) {
      handleGetPrompt(id);
    } else {
      setCurrentResult("");
      setResult("");
      setAllUserPrompts([]);
      setCourseName("");
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
        setCourseName(data.topic);
        setChatResponses(data?.customizedResults || []);
        setUseTypingEffect(false);
        setSpeed(0);
      }
    } catch (err) {
      console.log(err);
    }
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
          <label>
            ❖ Enter the course name in the field below. Ensure it reflects the
            subject and purpose of the course accurately.
          </label>
          <input
            type="text"
            placeholder="Course name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <p>Example: Data Structures and Algorithms</p>
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
              <p>❖ Course Description</p>
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
                <TypingEffect text={result} key={result} speed={speed} />
                {/*  {useTypingEffect ? (
                  <TypingEffect text={result} key={result} />
                ) : (
                  <p
                    style={{ fontSize: "1.1em", whiteSpace: "pre-line" }}
                    dangerouslySetInnerHTML={{
                      __html: result
                        .replace(/^(\d+)\./gm, "<strong>$1.</strong>") // Bold numbers
                        .replace(/\n/g, "<br /><br />"), // Ensure double line breaks for better spacing
                    }}
                  />
                )} */}
              </div>
            </>
          )}
        </div>
        {chatResponses.map((chatResponse, index) => (
          <div key={index} className={styles.generatedContent}>
            <p>❖ Customized Course Description {index + 1}</p>
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
                text={chatResponse}
                key={chatResponse}
                speed={speed}
              />
              {/*   {useTypingEffect ? (
                <TypingEffect text={chatResponse} key={chatResponse} />
              ) : (
                <p
                  style={{ fontSize: "1.1em", whiteSpace: "pre-line" }}
                  dangerouslySetInnerHTML={{
                    __html: chatResponse
                      .replace(/^(\d+)\./gm, "<strong>$1.</strong>") // Bold numbers
                      .replace(/\n/g, "<br /><br />"), // Ensure double line breaks for better spacing
                  }}
                />
              )} */}
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

export default CourseDescription;
