import React, { useState } from "react";

import { MdMail, MdPerson } from "react-icons/md";
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
    <div className="border-b-[1px] border-white px-4 py-2 flex bg-white/20 rounded-md">
      {icon}
      <input
        type={type}
        className="bg-transparent py-1 px-2 w-full outline-none placeholder:text-white"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        value={value}
      />
    </div>
  );
};

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
  const [form, setForm] = useState(defaultFormState);
  const [phone, setPhone] = useState("");
  const [addFeedback, { isLoading, isSuccess }] = useAddFeedbackMutation();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setForm({ ...form, PhoneNo: phone });
    addFeedback({ form });
  };

  return (
    <form className="flex flex-col justify-between items-stretch h-full w-full space-y-8">
      <CustomInput
        icon={<MdPerson className="text-white text-med" />}
        placeholder={t("formFullName")}
        type="text"
        name="FullName"
        id="FullName"
        value={form.FullName}
        onChange={handleChange}
      />

      <CustomInput
        icon={<MdMail className="text-white text-med" />}
        placeholder={t("formEmail")}
        type="email"
        name="Email"
        id="Email"
        value={form.Email}
        onChange={handleChange}
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
        containerClass="!border-b-[1px] border-white px-1 flex bg-white/20 rounded-md"
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
        name="Subject"
        id="Subject"
        value={form.Subject}
        onChange={handleChange}
      />
      <div className="border-b-[1px] border-white px-4 py-2 flex bg-white/20 rounded-md">
        <textarea
          placeholder={t("message")}
          name="Message"
          id="Message"
          value={form.Message}
          className="bg-transparent px-2 w-full outline-none placeholder:text-white"
          onChange={handleChange}
          rows={5}
        />
      </div>
      <button
        className={`bg-secondary text-white text-small w-full py-4 disabled:bg-gray-500 ${
          isLoading && "animate-pulse"
        } `}
        onClick={handleSubmit}
        disabled={
          form.Email.toString().replace(/ /g, "") == "" ||
          form.FullName.toString().replace(/ /g, "") == "" ||
          form.Message.toString().replace(/ /g, "") == "" ||
          form.Subject.toString().replace(/ /g, "") == "" ||
          phone.length < 12 ||
          isLoading
        }
      >
        {isLoading ? t("sending") : t("send")}
      </button>
    </form>
  );
};

export default RegisterForm;
