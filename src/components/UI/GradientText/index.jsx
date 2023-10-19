import React from "react";
import colors from "../../../settings";
const GradientText = ({ text, customStyle, header }) => {
  return (
    <p
      style={{
        background: header
          ? `linear-gradient(116deg, ${colors.secondary} 0%, ${colors.primary} 100%)`
          : `linear-gradient(316deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
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
