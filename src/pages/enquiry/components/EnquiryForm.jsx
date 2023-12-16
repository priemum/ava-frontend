import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { omit } from "lodash";
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
import CustomInput from "../../../components/Forms/CustomInput";
import useForm from "../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { showMessage } from "../../../redux/messageAction.slice";
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

const EnquiryForm = () => {
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
  const [typeOptions, setTypeOptions] = useState(RentFrequency);

  const [addEnquiry, { isLoading, isSuccess, isError }] =
    useAddEnquiryMutation();

  useEffect(() => {
    if (values.Purpose == "Rent") {
      setTypeOptions(RentFrequency);
      setValues({ ...values, Type: RentFrequency[0] });
    } else {
      setTypeOptions(CompletionStatus);
      setValues({ ...values, Type: CompletionStatus[0] });
    }
  }, [values.Purpose]);
  function submit(e) {
    fetch("https://geolocation-db.com/json/")
      .then((response) => response.json())
      .then((data) => {
        setValues({ ...values, IPAddress: data.IPv4 });
        addEnquiry({ values });
        setValues(defaultFormState);
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          showMessage({
            variant: "error",
            message: "Somthing Went Wrong, Please Try Again",
          })
        );
      });
  }

  useEffect(() => {
    if (!isLoading && isSuccess)
      dispatch(
        showMessage({
          variant: "success",
          message: "Thank you for your Enquiry",
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

  return (
    <div className="w-full flex max-lg:flex-col justify-center items-center gap-12">
      <div className="bg-fourth/40 space-y-6 text-white rounded-md shadow-lg backdrop-blur-[21px] p-4 md:p-8 border-[1px] border-t-white/70 border-l-white/70 border-white/40 w-[90%] lg:w-[40%] 2xl:w-[35%] min-h-[700px]">
        <p className="text-smaller"> {t("PropertyInformation")} </p>
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-tiny">{t("Purpose")} </p>
            <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2">
              {Purpose.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div
                      className={`py-4 rounded-md text-tiny w-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                        values.Purpose == item
                          ? "bg-secondary text-primary"
                          : "bg-transparent text-white"
                      }`}
                      onClick={() => setValues({ ...values, Purpose: item })}
                    >
                      {item}
                    </div>
                    {index !== Purpose.length - 1 && (
                      <div className="h-10 w-1 bg-white/50" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <CustomInput
            value={values.Type}
            name={"Type"}
            inputType="text"
            options={typeOptions}
            setState={setValues}
            state={values}
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
            value={values.Bedrooms}
            onChange={handleChange}
            error={Boolean(errors?.Bedrooms)}
          />
          <div className="flex justify-between items-center w-full gap-x-4">
            <CustomInput
              placeholder={t("MinPrice")}
              type="number"
              name="PriceMin"
              id="PriceMin"
              value={values.PriceMin}
              onChange={handleChange}
              error={Boolean(errors?.PriceMin)}
            />
            <CustomInput
              placeholder={t("MaxPrice")}
              type="number"
              name="PriceMax"
              id="PriceMax"
              value={values.PriceMax}
              onChange={handleChange}
              error={Boolean(errors?.PriceMax)}
            />
          </div>
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
        </div>
      </div>
      <div className="bg-fourth/40 space-y-6 text-white rounded-md shadow-lg backdrop-blur-[21px] p-4 md:p-8 border-[1px] border-t-white/70 border-l-white/70 border-white/40 w-[90%] lg:w-[40%] 2xl:w-[35%] min-h-[700px] flex flex-col">
        <p className="text-smaller"> {t("PersonalInformation")}</p>
        <div className="space-y-4 flex-1">
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
            <p className="text-tiny">{t("Gender")} </p>

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
        </div>

        <button
          className={`bg-buttonGrad text-primary text-small w-full py-4 disabled:!bg-gray-500 disabled:bg-none disabled:text-white rounded-md ${
            isLoading && "animate-pulse"
          } `}
          onClick={handleSubmit}
          disabled={disabled}
        >
          {isLoading ? t("sending") : t("send")}
        </button>
      </div>
    </div>
  );
};

export default EnquiryForm;
