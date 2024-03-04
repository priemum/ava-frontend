import React, { useRef } from "react";
import BGBACK from "../../assets/images/openHouse/open-house-background.jpg";
import LOGO from "../../assets/logos/AVA-Logo.svg";
import { useTranslation } from "react-i18next";
import CustomInput from "../../components/Forms/CustomInput";
import useForm from "../../hooks/useForm";
import { MdExpandMore } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import emailjs from "@emailjs/browser";

const defaultFormState = {
  Email: "",
  FullName: "",
  LastName: "",
  PhoneNo: "",
  Agent: "",
  PreferredTime: "",
};
const agentsList = ["Aika", "Fadl", "Maryam", "Kasra", "Marwa"];
const timeList = [
  "10:00 A.M - 12:00 P.M",
  "12:00 P.M - 14:00 P.M",
  "14:00 P.M - 16:00 P.M",
];
const OpenHousePage = () => {
  const { t, i18n } = useTranslation();
  const {
    disabled,
    setErrors,
    errors,
    setValues,
    values,
    handleChange,
    handleSubmit,
  } = useForm(submit, defaultFormState);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_b8ayq22",
        "template_slqqcpm",
        form.current,
        "sxh5TJan60LQqD6Sw"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  async function submit(e) {
    let formData = new FormData(form.current);
    try {
      const response = await fetch(import.meta.env.VITE_ZAPPIER_URL, {
        method: "POST",
        body: formData,
        "Content-Type": "multipart/form-data",
      });
      const result = response.json();
      console.log("Success:", result);
      sendEmail(e);
    } catch (error) {
      console.error("Error here:", error);
    }
  }
  return (
    <div
      className="h-screen w-full bg-center bg-cover bg-no-repeat flex flex-col justify-start items-center pt-24 max-lg:space-y-7 lg:space-y-4"
      style={{
        backgroundImage: `url(${BGBACK})`,
      }}
    >
      <img
        src={LOGO}
        alt="LOGO"
        className="h-[100px] w-[100px] lg:h-[150px] lg:w-[150px]"
      />
      <p className="text-[#5D473F] text-[35px] lg:text-big font-extralight text-center">
        {t("OpenHouseTitle")}
      </p>
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="border-2 border-black/50 rounded-2xl bg-[#CDC6BC]/50 w-full max-w-[90%] lg:max-w-[60%] p-12 grid md:grid-cols-2 gap-5 lg:gap-12 relative"
      >
        <div className="space-y-3 relative">
          <CustomInput
            inputLabel={t("formFullName")}
            containerStyle={"bg-white/0 border-black !rounded-none"}
            type="text"
            name="FullName"
            id="FullName"
            value={values.FullName}
            onChange={handleChange}
            error={Boolean(errors?.FullName)}
          />
        </div>

        <div className="space-y-3 relative">
          <CustomInput
            inputLabel={t("formLastName")}
            containerStyle={"bg-white/0 border-black !rounded-none"}
            type="text"
            name="LastName"
            id="LastName"
            value={values.LastName}
            onChange={handleChange}
            error={Boolean(errors?.LastName)}
          />
        </div>
        <div className="space-y-3 relative">
          <p className="font-semibold leading-3 translate-y-2 px-1">
            {t("formPhoneNumber")}
          </p>
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
                ? "!border-red-500 !border-[2px]"
                : "border-black border-b-[1px]"
            } px-1  flex bg-white/0 !outline-none`}
            inputClass={`!bg-transparent !text-black !w-full !text-lg !h-full !border-none ${
              i18n.language == "en" ? "px-0" : "mx-10"
            } !outline-none`}
            buttonClass={`!border-none !outline-none !text-lg `}
            buttonStyle={{
              direction: "ltr",
              outline: "none",
              outlineOffset: "0px",
              boxShadow: "none",
            }}
            dropdownClass="!bg-primary/90 !text-secondary"
            searchClass="!bg-primary/90 !text-secondary"
            inputStyle={{
              direction: "ltr",
              outline: "none",
              outlineOffset: "0px",
              boxShadow: "none",
            }}
          />
        </div>
        <div className="space-y-3 relative">
          <CustomInput
            inputLabel={t("formEmail")}
            containerStyle={"bg-white/0 border-black !rounded-none"}
            type="email"
            name="Email"
            id="Email"
            value={values.Email}
            onChange={handleChange}
            error={Boolean(errors?.Email)}
          />
        </div>
        <div className="space-y-3 relative">
          <CustomInput
            inputLabel={t("yourAgent")}
            placeholder={t("SelectOne")}
            containerStyle={"bg-white/0 border-black !rounded-none"}
            customStyle={"placeholder:text-black"}
            type="text"
            name="Agent"
            id="Agent"
            value={values.Agent}
            onChange={handleChange}
            error={Boolean(errors?.Agent)}
            options={agentsList}
            state={values}
            setState={setValues}
            select
            readOnly
            icon={<MdExpandMore size={24} className="text-black" />}
            reverseIcon
          />
        </div>
        <div className="space-y-3 relative">
          <CustomInput
            inputLabel={t("PreferredTime")}
            placeholder={t("SelectOne")}
            containerStyle={"bg-white/0 border-black !rounded-none"}
            customStyle={"placeholder:text-black"}
            type="text"
            name="PreferredTime"
            id="PreferredTime"
            value={values.PreferredTime}
            onChange={handleChange}
            error={Boolean(errors?.PreferredTime)}
            options={timeList}
            state={values}
            setState={setValues}
            select
            readOnly
            icon={<MdExpandMore size={24} className="text-black" />}
            reverseIcon
          />
        </div>
        <button
          type="submit"
          className="h-[60px] w-[150px] bg-[#EDE9E5] rounded-full border-black border-2 absolute -bottom-[30px] right-[5%] z-10 font-semibold transition-all duration-300 hover:bg-[#EDE9E5]/50"
        >
          {t("Submit")}
        </button>
      </form>
    </div>
  );
};

export default OpenHousePage;
