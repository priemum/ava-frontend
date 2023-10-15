import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "../../../../components/UI/Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import TiktokPixel from "tiktok-pixel";
const CustomInput = ({
  icon,
  placeholder,
  type,
  name,
  value,
  onChange,
  radios,
  radiosViewType,
  required,
}) => {
  return type == "text" || type == "email" || type == "number" ? (
    <div className="space-y-1">
      <p className="text-tiny font-semibold px-2">
        {placeholder + (required ? "*" : "")}
      </p>
      <div className="bg-white rounded-md px-4 py-4 flex items-center gap-x-2 shadow-sm drop-shadow-sm w-full">
        {icon}

        <input
          placeholder={placeholder + (required ? "*" : "")}
          type={type}
          className="bg-transparent px-2 w-full outline-none flex-1"
          name={name}
          onChange={onChange}
          id={name}
          value={value}
        />
      </div>
    </div>
  ) : type == "radio" ? (
    <div className="flex max-md:flex-col justify-start items-center gap-x-4 bg-white rounded-md shadow-sm drop-shadow-sm px-4 py-4 ">
      <p className="text-tiny font-semibold max-md:py-2 max-md:self-start">
        {placeholder + (required ? "*" : "")}
      </p>

      <div className={`${radiosViewType}`}>
        {radios.map((item, index) => {
          return (
            <div key={index} className={`${item.customStyle}`}>
              <input
                type="radio"
                name={item.name}
                value={item.value}
                id={item.id}
                checked={item.checked}
                onChange={onChange}
                style={{
                  accentColor: "#AA8A3A",
                }}
                className="mr-2"
              />
              <label htmlFor={item.id} className="" onClick={onChange}>
                {item.placeholder}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div> what is this?</div>
  );
};

let defaultFormState = {
  full_name: "",
  email: "",
  phone_No: "",
  years_experience: 0,
  area: "",
  field: "",
  gender: "",
  lvl_english: "",
  lvl_arabic: "",
  other_lang: "",
  closing_deal: "",
  cv: "",
};
const JobForm = () => {
  const [form, setForm] = useState(defaultFormState);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  function onFileChange(e) {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined);
    }
    setFile(e.target.files[0]);
    setForm({ ...form, cv: e.target.files[0] });
  }
  const hiddenFileInput = React.useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (e) => {
      const serviceId = "service_5wdnu6j";
      const templateId = "template_tl2vjv3";
      const userId = "sxh5TJan60LQqD6Sw";
      emailjs.sendForm(serviceId, templateId, formRef.current, userId).then(
        (result) => {
          console.log(result.text);
          setLoading(false);
          alert("Application Submitted Successfully, Thank You!");
          setForm(defaultFormState);
          window.location.reload(false);
        },
        (error) => {
          console.log(error.text);
          setLoading(false);
          alert("Somthing went wrong, please try again!");
          window.location.reload(false);
        }
      );
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    sendEmail(e);
    // let formData = new FormData(form.current);
    // try {
    //   const response = await fetch(
    //     "https://hooks.zapier.com/hooks/catch/12792925/312q4d0/",
    //     {
    //       method: "POST",
    //       body: formData,
    //       "Content-Type": "multipart/form-data",
    //     }
    //   );
    //   const result = response.json();
    //   console.log("Success:", result);
    //   sendEmail(e);
    //   if (downloadState) {
    //     let alink = document.createElement("a");
    //     alink.href = Brochure;
    //     alink.download = "BrochurePdf.pdf";
    //     alink.click();
    //   }
    //   dispatch(register());
    //   dispatch(counterIsFull());
    //   dispatch(hideModal());
    //   navigate("/thankyou");
    // } catch (error) {
    //   console.error("Error here:", error);
    // }
    // alert("Thank You !!!");
  };
  const options = {
    debug: true, // enable logs
  };
  TiktokPixel.init("CJE7143C77U2JVNFTR80", options);
  const formRef = React.useRef();
  TiktokPixel.track("SubmitForm", {
    content_name: "submit",
    content_category: "job",
    status: "submitted",
  });
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mt-8 p-8 w-full lg:grid grid-cols-2 gap-x-5 space-y-8 bg-third rounded-md shadow-md"
    >
      <p className="text-med font-semibold p-4 self-start lg:col-span-2">
        Apply For The Job
      </p>
      <CustomInput
        placeholder={"Full Name"}
        type="text"
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
        required
      />
      <CustomInput
        placeholder={"Email"}
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <div className="space-y-1">
        <p className="text-tiny font-semibold px-2">{"Phone Number*"} </p>
        <PhoneInput
          country={"ae"}
          placeholder={"Phone Number"}
          enableSearch={true}
          // value={form.phone_No}
          inputProps={{
            name: "phone_No",
            id: "phone_No",
            required: true,
          }}
          onChange={(e) => setForm({ ...form, phone_No: e })}
          containerClass="bg-white !rounded-md shadow-sm drop-shadow-sm px-1 flex z-10"
          inputClass={`!bg-transparent !text-black !w-full !text-lg !h-full !border-none px-0 !outline-none`}
          buttonClass={`!border-none !text-lg `}
          buttonStyle={{ direction: "ltr" }}
          inputStyle={{
            direction: "ltr",
          }}
        />
      </div>
      <CustomInput
        placeholder={"Years Of Experience"}
        type="number"
        name="years_experience"
        value={form.years_experience}
        onChange={handleChange}
        required
      />
      <CustomInput
        placeholder={"Area Specialty"}
        type="text"
        name="area"
        value={form.area}
        onChange={handleChange}
        required
      />
      <div />
      <CustomInput
        radiosViewType={
          "grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 max-md:w-full"
        }
        placeholder={"Field:"}
        type="radio"
        onChange={handleChange}
        radios={[
          {
            name: "field",
            value: "Off Plan",
            checked: form.field == "Off Plan",
            placeholder: "Off Plan",
            id: "Off Plan",
          },
          {
            name: "field",
            value: "Rent",
            checked: form.field == "Rent",
            placeholder: "Rent",
            id: "Rent",
          },
          {
            name: "field",
            value: "Secondary Market",
            checked: form.field == "Secondary Market",
            placeholder: "Secondary Market",
            id: "Secondary Market",
            customStyle: "max-md:col-span-full",
          },
        ]}
        required
      />
      <CustomInput
        radiosViewType={
          "grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 max-md:w-full"
        }
        placeholder={"Gender:"}
        type="radio"
        onChange={handleChange}
        radios={[
          {
            name: "gender",
            value: "Male",
            checked: form.gender == "Male",
            placeholder: "Male",
            id: "Male",
          },
          {
            name: "gender",
            value: "Female",
            checked: form.gender == "Female",
            placeholder: "Female",
            id: "Female",
          },
        ]}
        required
      />
      <div className="lg:col-span-2">
        <CustomInput
          radiosViewType={
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1"
          }
          placeholder={"English Level:"}
          type="radio"
          onChange={handleChange}
          radios={[
            {
              name: "lvl_english",
              value: "No proficiency",
              checked: form.lvl_english == "No proficiency",
              placeholder: "0 - No proficiency",
              id: "Noproficiencyen",
            },
            {
              name: "lvl_english",
              value: "Elementary proficiency",
              checked: form.lvl_english == "Elementary proficiency",
              placeholder: "1 - Elementary proficiency",
              id: "Elementaryproficiencyen",
            },
            {
              name: "lvl_english",
              value: "Limited working proficiency",
              checked: form.lvl_english == "Limited working proficiency",
              placeholder: "2 - Limited working proficiency",
              id: "Limitedworkingproficiencyen",
            },
            {
              name: "lvl_english",
              value: "Professional working proficiency",
              checked: form.lvl_english == "Professional working proficiency",
              placeholder: "3 - Professional working proficiency",
              id: "Professionalworkingproficiencyen",
            },
            {
              name: "lvl_english",
              value: "Full professional proficiency",
              checked: form.lvl_english == "Full professional proficiency",
              placeholder: "4 - Full professional proficiency",
              id: "Fullprofessionalproficiencyen",
            },
            {
              name: "lvl_english",
              value: "Primary fluency / Native",
              checked: form.lvl_english == "Primary fluency / Native",
              placeholder: "5 - Primary fluency / Native",
              id: "Primaryfluency/Nativeen",
            },
          ]}
          required
        />
      </div>
      <div className="lg:col-span-2">
        <CustomInput
          radiosViewType={
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1"
          }
          placeholder={"Arabic Level:"}
          type="radio"
          onChange={handleChange}
          radios={[
            {
              name: "lvl_arabic",
              value: "No proficiency",
              checked: form.lvl_arabic == "No proficiency",
              placeholder: "0 - No proficiency",
              id: "Noproficiencyar",
            },
            {
              name: "lvl_arabic",
              value: "Elementary proficiency",
              checked: form.lvl_arabic == "Elementary proficiency",
              placeholder: "1 - Elementary proficiency",
              id: "Elementaryproficiencyar",
            },
            {
              name: "lvl_arabic",
              value: "Limited working proficiency",
              checked: form.lvl_arabic == "Limited working proficiency",
              placeholder: "2 - Limited working proficiency",
              id: "Limitedworkingproficiencyar",
            },
            {
              name: "lvl_arabic",
              value: "Professional working proficiency",
              checked: form.lvl_arabic == "Professional working proficiency",
              placeholder: "3 - Professional working proficiency",
              id: "Professionalworkingproficiencyar",
            },
            {
              name: "lvl_arabic",
              value: "Full professional proficiency",
              checked: form.lvl_arabic == "Full professional proficiency",
              placeholder: "4 - Full professional proficiency",
              id: "Fullprofessionalproficiencyar",
            },
            {
              name: "lvl_arabic",
              value: "Primary fluency / Native",
              checked: form.lvl_arabic == "Primary fluency / Native",
              placeholder: "5 - Primary fluency / Native",
              id: "Primaryfluency/Nativear",
            },
          ]}
          required
        />
      </div>

      <CustomInput
        placeholder={"Other Languages"}
        type="text"
        name="other_lang"
        value={form.other_lang}
        onChange={handleChange}
      />
      <CustomInput
        placeholder={"Approximate Value Of Last Year Closing Deal (AED)"}
        type="text"
        name="closing_deal"
        value={form.closing_deal}
        onChange={handleChange}
        required
      />
      <div className="col-span-full flex max-sm:flex-col justify-between items-center">
        <div className="md:flex items-center md:gap-4">
          <Button
            textColor={"text-white font-medium"}
            w={"200px"}
            text={"Upload CV"}
            bgColor={"bg-primary"}
            customStyle={"py-2 px-4"}
            onClick={(e) => {
              e.preventDefault();
              hiddenFileInput.current.click();
            }}
          />
          <input
            type="file"
            // accept="images/*"
            name="cv"
            onChange={onFileChange}
            style={{ display: "none" }}
            ref={hiddenFileInput}
          />
          <p>{form.cv?.name} </p>
        </div>
        <button
          className="text-white font-medium bg-secondary py-2 px-4 rounded-[27px] text-center text-smaller disabled:bg-gray-500 w-[200px]"
          type="submit"
          disabled={
            form.full_name == "" ||
            form.email == "" ||
            form.phone_No == "" ||
            form.years_experience == "" ||
            form.area == "" ||
            form.field == "" ||
            form.gender == "" ||
            form.lvl_arabic == "" ||
            form.lvl_english == "" ||
            form.closing_deal == "" ||
            form.cv == ""
          }
        >
          {!loading ? "Send" : <div className="animate-bounce">Sending...</div>}
        </button>
      </div>
    </form>
  );
};

export default JobForm;
