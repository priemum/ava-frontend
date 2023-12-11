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
  error,
  errorMessage,
  textArea,
  textAreaRows,
  inputLabel,
  keepOnSelect,
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
    <>
      {inputLabel && (
        <p className="font-semibold leading-3 translate-y-2 px-1">
          {inputLabel}
        </p>
      )}
      <div
        className={`${
          !noInput &&
          `${
            error
              ? "border-red-500 border-[2px]"
              : "border-white border-b-[1px]"
          } bg-white/20 rounded-md`
        }  px-4 py-3 flex w-full items-center relative ${containerStyle}  ${
          reverseIcon && "flex-row-reverse"
        } ${select && "cursor-pointer"}`}
        onClick={() => {
          !keepOnSelect && setSelectStatus(!selectStatus);
        }}
      >
        {icon}
        {textArea ? (
          <textarea
            placeholder={placeholder}
            name={name}
            id={id}
            value={value ?? ""}
            onChange={onChange}
            className={`bg-transparent py-1 px-2 w-full outline-none placeholder:text-white ${customStyle} ${
              select && "cursor-pointer"
            }`}
            rows={textAreaRows ?? 15}
            readOnly={readOnly}
            onClick={() => {
              setSelectStatus(!selectStatus);
            }}
          />
        ) : (
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
        )}
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
                      onClick={() => {
                        setState({ ...state, [name]: item });
                      }}
                    >
                      {item}
                    </p>
                  );
                })
              : otherOptions}
          </div>
        )}
      </div>
      {/* {error && (
        <p className="text-tiny text-red-500 font-semibold">{errorMessage}</p>
      )} */}
    </>
  );
};

export default CustomInput;
