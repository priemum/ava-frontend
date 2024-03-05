import React, { useRef, useState, useEffect } from "react";
import Button from "../../../components/UI/Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useDispatch } from "react-redux";
import { showMessage } from "../../../redux/messageAction.slice";
import { Gender, Language_Lvl } from "../../../constants";
import { MdExpandMore } from "react-icons/md";
import { useTranslation } from "react-i18next";
import CustomInput from "../../../components/Forms/CustomInput";
import useForm from "../../../hooks/useForm";
import { omit } from "lodash";
import { useAddApplicationMutation } from "../../../redux/applications/applicationsSlice";
let defaultFormState = {
  FullName: "",
  Email: "",
  IPAddress: "192",
  PhoneNo: "",
  Gender: "Male",
  Message: "",
  YearsOfExp: "",
  AreaSpecialty: "",
  LinkedInURL: "",
  Field: "Off Plan",
  EnglishLvl: "None",
  ArabicLvl: "None",
  jobID: "",
  OtherLanguages: "",
  File: "",
};
const JobForm = ({ title, id }) => {
  const {
    disabled,
    setErrors,
    errors,
    setValues,
    values,
    handleChange,
    handleSubmit,
  } = useForm(submit, defaultFormState);
  const [addApplication, { data, isLoading, isSuccess, isError }] =
    useAddApplicationMutation();
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const [file, setFile] = useState();

  useEffect(() => {
    setValues({ ...values, jobID: id });
  }, [id]);
  function onFileChange(e) {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined);
    }
    setFile(e.target.files[0]);
    setValues({ ...values, File: e.target.files[0] });
  }
  const hiddenFileInput = React.useRef(null);

  function submit() {
    const formData = new FormData();
    formData.append("FullName", values.FullName);
    formData.append("Email", values.Email);
    formData.append("IPAddress", values.IPAddress);
    formData.append("PhoneNo", values.PhoneNo);
    formData.append("Gender", values.Gender);
    formData.append("Message", values.Message);
    formData.append("YearsOfExp", values.YearsOfExp);
    formData.append("AreaSpecialty", values.AreaSpecialty);
    formData.append("LinkedInURL", values.LinkedInURL);
    formData.append("Field", values.Field);
    formData.append("EnglishLvl", values.EnglishLvl);
    formData.append("ArabicLvl", values.ArabicLvl);
    formData.append("jobID", values.jobID);
    formData.append("OtherLanguages", values.OtherLanguages);
    formData.append("File", file);
    addApplication({ values: formData });
    setValues([]);
    setFile();
  }
  useEffect(() => {
    if (!isLoading && isSuccess)
      dispatch(
        showMessage({
          variant: "success",
          message: "Thank you for your Application",
        })
      );
    if (!isLoading && isError)
      dispatch(
        showMessage({
          variant: "error",
          message: "Somthing Went Wrong, Please Try Again",
        })
      );
  }, [isSuccess, isError]);
  const formRef = useRef();
  return (
    <form
      ref={formRef}
      className="p-8 w-full space-y-4 rounded-md text-white overflow-y-auto relative my-20"
    >
      <div className=" fixed w-full left-0 top-0 px-4 py-3">
        <p className="text-med lg:text-[35px] font-bold">
          {title ?? "Appy For The Job"}
        </p>
        <div className="h-px bg-white/50" />
      </div>
      <CustomInput
        containerStyle={"bg-white/20"}
        inputLabel={t("formFullName")}
        placeholder={t("formFullName")}
        type="text"
        name="FullName"
        value={values.FullName}
        onChange={handleChange}
        error={Boolean(errors?.FullName)}
      />
      <CustomInput
        containerStyle={"bg-white/20"}
        inputLabel={t("formEmail")}
        placeholder={t("formEmail")}
        type="email"
        name={"Email"}
        value={values.Email}
        onChange={handleChange}
        error={Boolean(errors?.Email)}
      />

      <>
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
            if (phone < 10) {
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
          dropdownClass="!bg-primary/70 !backdrop-blur-sm !text-secondary"
          searchClass="!bg-primary/70 !backdrop-blur-sm !text-secondary"
          inputStyle={{
            direction: "ltr",
            outline: "none",
            outlineOffset: "0px",
            boxShadow: "none",
          }}
        />
      </>

      <CustomInput
        containerStyle={"bg-white/20"}
        inputLabel={t("YearsOfExperience")}
        placeholder={t("YearsOfExperience")}
        type="number"
        name="YearsOfExp"
        value={values.YearsOfExp}
        onChange={handleChange}
        error={Boolean(errors?.YearsOfExp)}
      />
      <CustomInput
        containerStyle={"bg-white/20"}
        inputLabel={t("AreaSpecialty")}
        placeholder={t("AreaSpecialty")}
        type="text"
        name="area"
        value={values.area}
        onChange={handleChange}
        error={Boolean(errors?.AreaSpecialty)}
      />

      {/* <div className="space-y-1">
        <p className="text-tiny">{t("Field")} </p>
        <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2">
          {Fields.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <div
                  className={`py-4 rounded-md text-tiny w-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                    values.Field == item
                      ? "bg-secondary text-primary"
                      : "bg-transparent text-white"
                  }`}
                  onClick={() =>
                    setValues({
                      ...values,
                      Field: item,
                    })
                  }
                >
                  {item}
                </div>
                {index !== Fields.length - 1 && (
                  <div className="h-10 w-1 bg-white/50" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div> */}
      <div className="space-y-1">
        <p className="text-tiny">{t("Gender")} </p>
        <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2 bg-white/20">
          {Gender.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <div
                  className={`py-4 rounded-md text-tiny w-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                    values.Gender == item.value
                      ? "bg-secondary text-primary"
                      : "bg-transparent text-white"
                  }`}
                  onClick={() => setValues({ ...values, Gender: item.value })}
                >
                  {item.lng[i18n.language]}
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
        containerStyle={"bg-white/20"}
        inputLabel={t("EnglishLvl")}
        value={
          Language_Lvl.find((x) => x.value == values.EnglishLvl)?.lng[
            i18n.language
          ]
        }
        name={"EnglishLvl"}
        inputType="text"
        translatedOptions={Language_Lvl}
        setState={setValues}
        state={values}
        reverseIcon
        icon={<MdExpandMore className="text-smaller" />}
        select
        readOnly
      />
      <CustomInput
        containerStyle={"bg-white/20"}
        inputLabel={t("ArabicLvl")}
        value={
          Language_Lvl.find((x) => x.value == values.ArabicLvl)?.lng[
            i18n.language
          ]
        }
        name={"ArabicLvl"}
        inputType="text"
        translatedOptions={Language_Lvl}
        setState={setValues}
        state={values}
        reverseIcon
        icon={<MdExpandMore className="text-smaller" />}
        select
        readOnly
      />

      <CustomInput
        containerStyle={"bg-white/20"}
        inputLabel={t("OtherLanguages")}
        placeholder={t("OtherLanguages")}
        type="text"
        name="OtherLanguages"
        value={values.OtherLanguages}
        onChange={handleChange}
        error={Boolean(errors?.OtherLanguages)}
      />
      <CustomInput
        containerStyle={"bg-white/20"}
        inputLabel={t("LinkedInURL")}
        placeholder={t("LinkedInURL")}
        type="text"
        name="LinkedInURL"
        value={values.LinkedInURL}
        onChange={handleChange}
        error={Boolean(errors?.LinkedInURL)}
      />
      <CustomInput
        containerStyle={"bg-white/20"}
        inputLabel={t("MessageToTeam")}
        placeholder={t("MessageToTeam")}
        type="text"
        name="Message"
        value={values.Message}
        onChange={handleChange}
        error={Boolean(errors?.Message)}
        textArea
        textAreaRows={5}
      />

      <div className="col-span-full flex max-sm:flex-col justify-between items-center fixed py-1 px-4 w-full left-0 bottom-0">
        <div className="md:flex items-center md:gap-4">
          <Button
            textColor={"text-white font-medium"}
            w={"200px"}
            text={t("UploadCV")}
            bgColor={"bg-primary"}
            customStyle={"py-2 px-4"}
            borderRadius={"6px"}
            onClick={(e) => {
              e.preventDefault();
              hiddenFileInput.current.click();
            }}
          />
          <input
            type="file"
            // accept="images/*"
            name="File"
            onChange={onFileChange}
            style={{ display: "none" }}
            ref={hiddenFileInput}
          />
          <p>{values.File?.name} </p>
        </div>
        <button
          className="text-primary font-medium bg-secondary py-2 px-4 rounded-md text-center text-smaller disabled:bg-gray-500 w-[200px]"
          type="submit"
          onClick={handleSubmit}
          disabled={disabled}
        >
          {!isLoading ? (
            t("Send")
          ) : (
            <div className="animate-bounce">{t("Sending")}</div>
          )}
        </button>
      </div>
    </form>
  );
};

export default JobForm;
