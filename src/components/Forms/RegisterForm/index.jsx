import React, { useEffect, useState } from "react";
import { omit } from "lodash";
import { MdMail, MdPerson } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useTranslation } from "react-i18next";
import { useAddFeedbackMutation } from "../../../redux/feedback/feedbackSlice";
import { Gender } from "../../../constants";
import CustomInput from "../CustomInput";
import useForm from "../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { showMessage } from "../../../redux/messageAction.slice";

const defaultFormState = {
  Email: "",
  FullName: "",
  Gender: "Male",
  IPAddress: "192.1.1.1test",
  PhoneNo: "",
  Subject: "",
  Message: "",
};
const RegisterForm = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const {
    disabled,
    setErrors,
    errors,
    setValues,
    values,
    handleChange,
    handleSubmit,
  } = useForm(submit, defaultFormState);
  const [phone, setPhone] = useState("");
  const [addFeedback, { isLoading, isSuccess, isError }] =
    useAddFeedbackMutation();

  function submit(e) {
    setValues({ ...values, PhoneNo: phone });
    addFeedback({ values });
    setValues(defaultFormState);
  }

  useEffect(() => {
    if (!isLoading && isSuccess)
      dispatch(
        showMessage({
          variant: "success",
          message: "Thank you for your Feedback",
        })
      );
    if (!isLoading && isError)
      dispatch(
        showMessage({
          variant: "error",
          message: "Somthing Went Wrong, Please Try Again",
        })
      );
  }, [isSuccess]);

  return (
    <form className="flex flex-col justify-between items-stretch h-full w-full space-y-4">
      <CustomInput
        icon={<MdPerson className="text-white text-med" />}
        placeholder={t("formFullName")}
        type="text"
        name="FullName"
        id="FullName"
        value={values.FullName}
        onChange={handleChange}
        error={Boolean(errors?.FullName)}
      />

      <CustomInput
        icon={<MdMail className="text-white text-med" />}
        placeholder={t("formEmail")}
        type="email"
        name="Email"
        id="Email"
        value={values.Email}
        onChange={handleChange}
        error={Boolean(errors?.Email)}
      />

      <PhoneInput
        country={"ae"}
        placeholder={t("formPhoneNumber")}
        enableSearch={true}
        inputProps={{
          name: "phone",
          id: "phone",
          required: true,
        }}
        onChange={(phone) => {
          if (phone.length < 10) {
            setErrors({
              ...errors,
              PhoneNo: "Phone Number is atleast 10 digits",
            });
          } else {
            let newObj = omit(errors, "PhoneNo");
            setErrors(newObj);
          }
          setValues({ ...values, PhoneNo: phone });
        }}
        value={values.PhoneNo}
        containerStyle={{
          outline: "none",
          outlineOffset: "0px",
          boxShadow: "none",
        }}
        containerClass={`${
          Boolean(errors.PhoneNo)
            ? "!border-[1px] border-red-500"
            : "!border-b-[1px] border-white"
        } px-1 flex bg-white/20 rounded-md !outline-none`}
        inputClass={`!bg-transparent !text-white !w-full !text-lg !h-full !border-none ${
          i18n.language == "en" ? "px-0" : "mx-10"
        } !outline-none`}
        buttonClass={`!border-none !outline-none !text-lg `}
        buttonStyle={{
          direction: "ltr",
          outline: "none",
          outlineOffset: "0px",
          boxShadow: "none",
        }}
        dropdownClass="!bg-primary/70 !backdrop-blur-[21px] !text-secondary"
        searchClass="!bg-primary/70 !backdrop-blur-[21px] !text-secondary"
        inputStyle={{
          direction: "ltr",
          outline: "none",
          outlineOffset: "0px",
          boxShadow: "none",
        }}
      />
      <div className="space-y-1">
        <p className="text-tiny text-white">{t("Gender")} </p>

        <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2">
          {Gender.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <div
                  className={`py-4 rounded-md text-tiny w-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                    values.Gender == item
                      ? "bg-secondary text-primary"
                      : "bg-transparent text-white"
                  }`}
                  onClick={() => setValues({ ...values, Gender: item })}
                >
                  {item}
                </div>
                {index !== Gender.length - 1 && (
                  <div className="h-10 w-1 bg-white/50" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <CustomInput
        placeholder={t("Subject")}
        type="text"
        name="Subject"
        id="Subject"
        value={values.Subject}
        onChange={handleChange}
        error={Boolean(errors?.Subject)}
      />
      <CustomInput
        placeholder={t("Message")}
        name="Message"
        id="Message"
        value={values.Message}
        onChange={handleChange}
        textArea
        textAreaRows={8}
        error={Boolean(errors?.Message)}
      />
      <button
        className={`bg-buttonGrad text-primary font-semibold text-small w-full py-3 disabled:bg-none disabled:bg-gray-500 disabled:text-white rounded-md ${
          isLoading && "animate-pulse"
        } `}
        onClick={handleSubmit}
        disabled={disabled}
      >
        {isLoading ? t("sending") : t("send")}
      </button>
    </form>
  );
};

export default RegisterForm;
