import React, { useState, useEffect } from "react";
export const TypingEffect = ({ text, speed = 10 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);
  return (
    <p
      style={{ fontSize: "1.1em", whiteSpace: "pre-line" }}
      dangerouslySetInnerHTML={{
        __html: displayedText
          .replace(/^(\d+)\./gm, "<strong>$1.</strong>") // Bold numbers
          .replace(/\n/g, "<br /><br />"), // Ensure double line breaks for better spacing
      }}
    />
  );
};
