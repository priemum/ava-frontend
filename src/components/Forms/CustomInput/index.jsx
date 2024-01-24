import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  singleState,
  containerStyle,
  noInput,
  error,
  errorMessage,
  textArea,
  textAreaRows,
  inputLabel,
  keepOnSelect,
  translatedOptions,
  inputRef,
}) => {
  const [selectStatus, setSelectStatus] = useState(false);
  const { i18n } = useTranslation();
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
  useEffect(() => {
    if (!keepOnSelect) setSelectStatus(false);
  }, [state]);
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
          } bg-primary/40 rounded-md`
        }  px-4 py-3 flex w-full items-center relative ${containerStyle} ${
          reverseIcon && "flex-row-reverse"
        } ${select && "cursor-pointer"}`}
        onClick={() => {
          // if (selectStatus) {
          //   !keepOnSelect && setSelectStatus(false);
          // } else {
          //   setSelectStatus(!selectStatus);
          // }
          setSelectStatus(true);
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
          />
        ) : (
          <input
            ref={inputRef}
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
        )}
        {select && (
          <div
            ref={ref}
            className={`${
              selectStatus ? "scale-100" : "scale-0"
            } z-30 transition-all duration-300 origin-top absolute left-0 top-14 rounded-md shadow-2xl drop-shadow-2xl bg-primary/60 backdrop-blur-sm text-white w-full p-2 max-h-[300px] overflow-y-auto`}
          >
            {options
              ? options.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className="text-tiny hover:bg-secondary/50 rounded-md p-2 transition-all duration-300"
                      onClick={() => {
                        singleState
                          ? setState(item)
                          : setState({ ...state, [name]: item });
                      }}
                    >
                      {item}
                    </p>
                  );
                })
              : translatedOptions
              ? translatedOptions.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className="text-tiny hover:bg-secondary/50 rounded-md p-2 transition-all duration-300"
                      onClick={() => {
                        singleState
                          ? setState(item.value)
                          : setState({ ...state, [name]: item.value });
                      }}
                    >
                      {item.lng[i18n.language]}
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
