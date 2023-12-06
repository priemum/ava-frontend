import React, { useRef, useState, useEffect } from "react";
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
  otherOptions,
  select,
  setState,
  state,
  containerStyle,
  noInput,
}) => {
  const [selectStatus, setSelectStatus] = useState(false);

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSelectStatus(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <div
      className={`${
        !noInput && "border-b-[1px] border-white bg-white/20 rounded-md"
      }  px-4 py-2 flex w-full items-center relative ${containerStyle}  ${
        reverseIcon && "flex-row-reverse"
      } ${select && "cursor-pointer"}`}
      onClick={() => {
        if (select) setSelectStatus(true);
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
        onClick={() => {
          setSelectStatus(!selectStatus);
        }}
      />
      {select && (
        <div
          ref={ref}
          className={`${
            selectStatus ? "scale-100" : "scale-0"
          } z-30 transition-all duration-300 origin-top absolute left-0 top-14 rounded-md shadow-2xl drop-shadow-2xl bg-primary/70 backdrop-blur-[21px] text-white w-full p-2`}
        >
          {options
            ? options.map((item, index) => {
                return (
                  <p
                    key={index}
                    className="text-tiny hover:bg-secondary/50 rounded-md p-2 transition-all duration-300"
                    onClick={() => setState({ ...state, Type: item })}
                  >
                    {item}
                  </p>
                );
              })
            : otherOptions}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
