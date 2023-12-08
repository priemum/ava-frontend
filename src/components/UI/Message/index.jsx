import React, { useEffect, memo } from "react";
import { MdClose } from "react-icons/md";
import {
  hideMessage,
  selectOptions,
  selectState,
} from "../../../redux/messageAction.slice";
import { useDispatch, useSelector } from "react-redux";

const MessageBox = () => {
  const dispatch = useDispatch();
  const state = useSelector(selectState);
  const options = useSelector(selectOptions);
  useEffect(() => {
    if (state) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 4000);
    }
  }, [state]);
  return (
    <div
      className={`${
        state ? "scale-100 opacity-100" : "scale-0 opacity-0"
      } transition-all duration-300 h-[100px] w-[80vw] max-w-[500px] shadow-2xl drop-shadow-2xl rounded-md fixed top-[10vh] left-1/2 -translate-x-1/2 z-50 p-4 flex items-center justify-between`}
      style={{
        background:
          options.variant === "success"
            ? "green"
            : options.variant === "error"
            ? "red"
            : null,
      }}
    >
      <p className="text-med text-white">{options.message}</p>
      <MdClose
        className="text-med cursor-pointer text-white"
        onClick={() => dispatch(hideMessage())}
      />
    </div>
  );
};

export default memo(MessageBox);
