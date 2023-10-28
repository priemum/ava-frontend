import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MdMail, MdPerson, MdLocationOn } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useTranslation } from "react-i18next";
import { useAddFeedbackMutation } from "../../../redux/feedback/feedbackSlice";
const CustomInput = ({
  icon,
  placeholder,
  type,
  name,
  id,
  value,
  onChange,
}) => {
  return (
    <div className="border-b-[1px] border-white px-4 py-2 flex bg-white/10 rounded-md">
      {icon}
      <input
        type={type}
        className="bg-transparent px-2 w-full outline-none placeholder:text-white"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        value={value}
      />
    </div>
  );
};

const RegisterForm = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [Message, setMessage] = useState("");
  const form = useRef();
  const [addFeedback, { isLoading, isSuccess }] = useAddFeedbackMutation();
  const handleSubmit = async (e) => {
    addFeedback({ form: {} });
  };

  return (
    <form
      ref={form}
      onSubmit={handleSubmit}
      className="flex flex-col justify-between items-stretch h-full w-full space-y-8"
    >
      <CustomInput
        icon={<MdPerson className="text-white text-med" />}
        placeholder={t("formFullName")}
        type="text"
        name="fullName"
        id="fullName"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
      />

      <CustomInput
        icon={<MdMail className="text-white text-med" />}
        placeholder={t("formEmail")}
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
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
        onChange={setPhone}
        containerClass="!border-b-[1px] border-white px-1 flex bg-white/10 rounded-md "
        inputClass={`!bg-transparent !text-white !w-full !text-lg !h-full !border-none  ${
          i18n.language == "en" ? "px-0" : "mx-10"
        } !outline-none`}
        buttonClass={`!border-none !text-lg `}
        buttonStyle={{ direction: "ltr" }}
        inputStyle={{
          direction: "ltr",
          outline: "none",
        }}
      />
      <CustomInput
        // icon={<MdLocationOn className="text-white text-med" />}
        placeholder={t("subject")}
        type="text"
        name="subject"
        id="subject"
        value={email}
        onChange={(event) => setLocation(event.target.value)}
      />
      <CustomInput
        // icon={<MdLocationOn className="text-white text-med" />}
        placeholder={t("message")}
        type="text"
        name="message"
        id="message"
        value={email}
        onChange={(event) => setLocation(event.target.value)}
      />
      <button
        className="bg-secondary text-white text-small w-full py-4 disabled:bg-gray-500 "
        disabled={
          email.replace(/ /g, "") == "" ||
          fullName.replace(/ /g, "") == "" ||
          location.replace(/ /g, "") == "" ||
          phone.length < 12
        }
      >
        {t("send")}
      </button>
    </form>
  );
};

export default RegisterForm;
