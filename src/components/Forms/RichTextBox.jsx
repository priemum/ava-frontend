import React from "react";
import ReactQuill from "react-quill";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "../../styles/quillStyles.css";

const RichTextBox = ({
  value,
  setValue,
  error,
  moreStyle,
  label,
  onChange,
  disabled,
  h,
  theme,
}) => {
  const fontSizeArr = [
    // "8px",
    // "9px",
    // "10px",
    // "12px",
    "14px",
    "16px",
    "20px",
    "24px",
    "32px",
    "42px",
    "54px",
    "68px",
    "84px",
    "98px",
  ];

  var Size = Quill.import("attributors/style/size");
  Size.whitelist = fontSizeArr;
  Quill.register(Size, true);
  return (
    <div className={`flex flex-col m-4 ${h ?? "h-full"} ${moreStyle}`}>
      <div className="text-tiny pb-2"> {label}</div>
      <ReactQuill
        readOnly={disabled}
        theme={theme ?? "snow"}
        value={value}
        // onChange={(value) => {
        //   setValue(value);
        // }}
        onChange={onChange}
        className={`w-full ${h ?? "h-full"} ${
          error && "border-red-600 border-[1px] pb-[60px]"
        } `}
        modules={{
          toolbar: [
            // [{ font: [] }],
            [{ size: fontSizeArr }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
            ["link", "image"],
            ["clean"],
            [{ direction: "rtl" }],
          ],
        }}
      />
    </div>
  );
};

export default RichTextBox;
