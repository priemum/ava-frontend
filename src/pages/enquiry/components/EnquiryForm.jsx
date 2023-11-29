import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdMail, MdPerson, MdExpandMore } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import {
  Gender,
  Purpose,
  RentFrequency,
  CompletionStatus,
} from "../../../constants";
import { useAddEnquiryMutation } from "../../../redux/enquiry/enquirySlice";
import { useForm } from "react-hook-form";

const defaultFormState = {
  Type: "",
  Purpose: "Rent",
  Bedrooms: "",
  PriceMin: "",
  PriceMax: "",
  Message: "",
  Email: "",
  FullName: "",
  Gender: "Male",
  IPAddress: "192.1.1.1test",
  PhoneNo: "",
};
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
}) => {
  const [selectStatus, setSelectStatus] = useState(false);

  return (
    <div
      className={`border-b-[1px] border-white px-4 py-2 flex bg-white/20 rounded-md w-full items-center relative ${
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
const EnquiryForm = () => {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState(defaultFormState);
  const [phone, setPhone] = useState("");
  const [typeOptions, setTypeOptions] = useState(RentFrequency);
  const { register, handleSubmit } = useForm();

  const [addEnquiry, { isLoading, isSuccess, isError }] =
    useAddEnquiryMutation();
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  }
  useEffect(() => {
    if (form.Purpose == "Rent") {
      setTypeOptions(RentFrequency);
      setForm({ ...form, Type: RentFrequency[0] });
    } else {
      setTypeOptions(CompletionStatus);
      setForm({ ...form, Type: CompletionStatus[0] });
    }
  }, [form.Purpose]);
  const onSubmit = async (e) => {
    e.preventDefault();
    setForm({ ...form, PhoneNo: phone });
    addEnquiry({ form });
    setForm(defaultFormState);
  };

  useEffect(() => {
    if (!isLoading && isSuccess) alert("Thank you for your Enquiry");
    if (!isLoading && isError) alert("Somthing Went Wrong, Please Try Again");
  }, [isSuccess, isError]);

  return (
    <form
      className="w-full flex max-md:flex-col max-md:justify-center md:justify-center items-center md:gap-x-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="bg-fourth/40 space-y-6 text-white rounded-md shadow-lg backdrop-blur-[21px] p-8 border-[1px] border-t-white/70 border-l-white/70 border-white/40 w-[30vw] min-h-[65vh]">
        <p className="text-smaller"> Property Information</p>
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-tiny">{t("Purpose")} </p>
            <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2">
              {Purpose.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div
                      className={`py-4 rounded-md text-tiny w-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                        form.Purpose == item
                          ? "bg-secondary text-primary"
                          : "bg-transparent text-white"
                      }`}
                      onClick={() => setForm({ ...form, Purpose: item })}
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
            value={form.Type}
            selectID={"types"}
            inputType="text"
            options={typeOptions}
            setState={setForm}
            state={form}
            reverseIcon
            icon={<MdExpandMore className="text-smaller" />}
            select
            readOnly
          />
          <CustomInput
            placeholder={t("Bedrooms")}
            type="number"
            name="Bedrooms"
            id="Bedrooms"
            value={form.Bedrooms}
            onChange={handleChange}
          />
          <div className="flex justify-between items-center w-full gap-x-4">
            <CustomInput
              placeholder={t("MinPrice")}
              type="number"
              name="PriceMin"
              id="PriceMin"
              value={form.PriceMin}
              onChange={handleChange}
            />
            <CustomInput
              placeholder={t("MaxPrice")}
              type="number"
              name="PriceMax"
              id="PriceMax"
              value={form.PriceMax}
              onChange={handleChange}
            />
          </div>
          <div className="border-b-[1px] border-white px-4 py-2 flex bg-white/20 rounded-md">
            <textarea
              placeholder={t("Message")}
              name="Message"
              id="Message"
              value={form.Message}
              className="bg-transparent px-2 w-full outline-none placeholder:text-white resize-none"
              onChange={handleChange}
              rows={5}
            />
          </div>
        </div>
      </div>
      <div className="bg-fourth/40 space-y-6 text-white rounded-md shadow-lg backdrop-blur-[21px] p-8 border-[1px] border-t-white/70 border-l-white/70 border-white/40 w-[30vw] min-h-[65vh] flex flex-col">
        <p className="text-smaller"> Personal Information</p>
        <div className="space-y-4 flex-1">
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
          <div className="space-y-1">
            <p className="text-tiny">{t("Gender")} </p>

            <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2">
              {Gender.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div
                      className={`py-4 rounded-md text-tiny w-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                        form.Gender == item
                          ? "bg-secondary text-primary"
                          : "bg-transparent text-white"
                      }`}
                      onClick={() => setForm({ ...form, Gender: item })}
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
        </div>

        <button
          className={`bg-buttonGrad text-primary text-small w-full py-4 disabled:!bg-gray-500 disabled:bg-none disabled:text-white rounded-md ${
            isLoading && "animate-pulse"
          } `}
          type="submit"
          // onClick={handleSubmit}
          disabled={
            form.Email.replace(/ /g, "") == "" ||
            form.Bedrooms.toString().replace(/ /g, "") == "" ||
            form.PriceMax.toString().replace(/ /g, "") == "" ||
            form.PriceMin.toString().replace(/ /g, "") == "" ||
            form.Type.replace(/ /g, "") == "" ||
            form.FullName.replace(/ /g, "") == "" ||
            form.Message.replace(/ /g, "") == "" ||
            phone.length < 12 ||
            isLoading
          }
        >
          {isLoading ? t("sending") : t("send")}
        </button>
      </div>
    </form>
  );
};

export default EnquiryForm;
