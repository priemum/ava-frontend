import React, { useState } from "react";
const CustomInput = ({
  icon,
  placeholder,
  type,
  name,
  id,
  value,
  onChange,
  reverseIcon,
  readOnly,
  customStyle,
  options,
  select,
  setState,
  state,
  containerStyle,
}) => {
  const [selectStatus, setSelectStatus] = useState(false);

  return (
    <div
      className={`border-b-[1px] border-white px-4 py-2 flex bg-white/20 rounded-md w-full items-center relative ${containerStyle}  ${
        reverseIcon && "flex-row-reverse"
      } ${select && "cursor-pointer"}`}
      onClick={() => {
        if (select) setSelectStatus(!selectStatus);
      }}
    >
      {icon}
      <input
        type={type}
        className={`bg-transparent py-1 px-2 w-full outline-none placeholder:text-white ${customStyle} ${
          select && "cursor-pointer"
        }`}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        value={value ?? ""}
        readOnly={readOnly}
      />
      {select && (
        <div
          className={`${
            selectStatus ? "scale-100" : "scale-0"
          } z-30 transition-all duration-300 origin-top absolute left-0 top-14 rounded-md shadow-2xl drop-shadow-2xl bg-primary/70 backdrop-blur-[21px] text-white w-full p-2`}
        >
          {options.map((item, index) => {
            return (
              <p
                key={index}
                className="text-tiny hover:bg-secondary/50 rounded-md p-2 transition-all duration-300"
                onClick={() => setState({ ...state, Type: item })}
              >
                {item}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
