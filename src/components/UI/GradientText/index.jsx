import React from "react";

const GradientText = ({ text, customStyle, header }) => {
  return (
    <p
      style={{
        background: header
          ? "linear-gradient(116deg, #DDB26E 0%, #161535 100%)"
          : "linear-gradient(316deg, #DDB26E 0%, #161535 100%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
      }}
      className={customStyle}
    >
      {text}
    </p>
  );
};

export default GradientText;
