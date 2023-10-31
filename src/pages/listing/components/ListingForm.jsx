import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MdMail,
  MdPerson,
  MdDeleteOutline as DeleteIcon,
  MdOutlineDeleteSweep as DeleteAllIcon,
} from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Gender, Purpose } from "../../../constants";
import { useAddListingMutation } from "../../../redux/listings/listingsSlice";
import { useGetLNGQuery } from "../../../redux/languages/languagesSlice";
import RichTextBox from "../../../components/Forms/RichTextBox";
import Button from "../../../components/UI/Button";
import Slider from "react-slick";
const defaultFormState = {
  Purpose: "Rent",
  Type: "",
  Bedrooms: "",
  Bacloney: "",
  Price: "",
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
}) => {
  return (
    <div className="border-b-[1px] border-white px-4 py-2 flex bg-white/20 rounded-md w-full">
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

const ListingForm = () => {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState(defaultFormState);
  const [phone, setPhone] = useState("");
  const [images, setImages] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const [listWithUs_Translation, setListWithUs_Translation] = useState([]);
  const {
    data: lngs,
    isLoading: lngIsLoading,
    isFetching: lngIsFethcing,
    isSuccess: lngisSuccess,
    isError: lngIsError,
    error: lngError,
  } = useGetLNGQuery();
  const [addListing, { isLoading, isSuccess, isError }] =
    useAddListingMutation();
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  }
  const newImageUrls = [];
  useEffect(() => {
    if (images.length < 1) return;
    images.forEach((img) => newImageUrls.push(URL.createObjectURL(img)));
    setImageURL(newImageUrls);
  }, [images]);
  function onImageChange(e) {
    setImages([...images, ...e.target.files]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    setForm({ ...form, PhoneNo: phone });
    formData.append("Purpose", form.Purpose);
    formData.append("Type", form.Type);
    formData.append("Bedrooms", form.Bedrooms);
    formData.append("Bacloney", form.Bacloney);
    formData.append("Price", form.Price);
    formData.append("Email", form.Email);
    formData.append("FullName", form.FullName);
    formData.append("Gender", form.Gender);
    formData.append("IPAddress", form.IPAddress);
    formData.append("PhoneNo", form.PhoneNo);
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("Images", images[i]);
      }
    }
    for (let i = 0; i < listWithUs_Translation.length; i++) {
      formData.append(
        `ListWithUs_Translation[${i}][Name]`,
        listWithUs_Translation[i].Name
      );
      formData.append(
        `ListWithUs_Translation[${i}][Description]`,
        listWithUs_Translation[i].Description
      );
      formData.append(
        `ListWithUs_Translation[${i}][languagesID]`,
        listWithUs_Translation[i].languagesID
      );
    }
    addListing({ form: formData });
    setForm(defaultFormState);
    setImageURL([]);
    setImages([]);
    setListWithUs_Translation([]);
  };
  function handleTranslationChange(e, item, type) {
    setListWithUs_Translation((current) =>
      current.map((obj) => {
        if (obj.Language.Code == item.Language.Code) {
          return {
            ...obj,
            Name: type == "Name" ? e.target.value : obj.Name,
            Description: type == "Description" ? e : obj.Description,
          };
        }
        return obj;
      })
    );
  }
  useEffect(() => {
    if (!isLoading && isSuccess) alert("Thank you for your Listing");
    if (!isLoading && isError) alert("Somthing Went Wrong, Please Try Again");
  }, [isSuccess, isError]);

  useEffect(() => {
    if (lngisSuccess) {
      let translations = [];
      lngs.normalData.map((item) => {
        translations.push({
          languagesID: item.id,
          Language: {
            Name: item.Name,
            Code: item.Code,
          },
          Name: "",
          Description: "",
        });
      });
      setListWithUs_Translation(translations);
    }
  }, [lngisSuccess]);
  const hiddenFileInput = React.useRef(null);

  return (
    <>
      <div className="bg-fourth/40 space-y-6 text-white rounded-md shadow-lg backdrop-blur-[21px] p-8 border-[1px] border-t-white/70 border-l-white/70 border-white/40 w-[30vw] md:max-w-[60%] md:min-h-[65vh] col-span-2 ">
        <p className="text-smaller"> Property Information</p>
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-tiny">{t("Purpose")} </p>
            <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2">
              {Purpose.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className={`py-4 rounded-md text-tiny w-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                        form.Purpose == item
                          ? "bg-secondary text-primary"
                          : "bg-transparent text-white"
                      }`}
                      onClick={() => setForm({ ...form, Purpose: item })}
                    >
                      {item == "Buy" ? "Sale" : item}
                    </div>
                    {index !== Gender.length - 1 && (
                      <div className="h-10 w-1 bg-white/50" />
                    )}
                  </>
                );
              })}
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <CustomInput
              placeholder={t("Type")}
              type="text"
              name="Type"
              id="Type"
              value={form.Type}
              onChange={handleChange}
            />
            <CustomInput
              placeholder={t("Price")}
              type="number"
              name="Price"
              id="Price"
              value={form.Price}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <CustomInput
              placeholder={t("Bedrooms")}
              type="number"
              name="Bedrooms"
              id="Bedrooms"
              value={form.Bedrooms}
              onChange={handleChange}
            />
            <CustomInput
              placeholder={t("Balconey")}
              type="number"
              name="Bacloney"
              id="Bacloney"
              value={form.Bacloney}
              onChange={handleChange}
            />
          </div>
          <div
            className={`${
              listWithUs_Translation.length !== 0 ? "block" : "hidden"
            }`}
          >
            <CustomInput
              placeholder={t("Name")}
              type="text"
              name="Name"
              id="Name"
              value={
                listWithUs_Translation.find((x) => x.Language.Code == "En")
                  ?.Name
              }
              onChange={(e) =>
                handleTranslationChange(
                  e,
                  listWithUs_Translation.find((x) => x.Language.Code == "En"),
                  "Name"
                )
              }
            />
            <RichTextBox
              label={`Description`}
              value={
                listWithUs_Translation.find((x) => x.Language.Code == "En")
                  ?.Description
              }
              onChange={(e) =>
                handleTranslationChange(
                  e,
                  listWithUs_Translation.find((x) => x.Language.Code == "En"),
                  "Description"
                )
              }
            />
          </div>
        </div>
      </div>
      <div className="w-[90%] md:max-w-[30%] space-y-4">
        <div className="bg-fourth/40 space-y-6 text-white rounded-md shadow-lg backdrop-blur-[21px] p-8 border-[1px] border-t-white/70 border-l-white/70 border-white/40 w-full h-[55vh] md:max-h-[55vh] flex flex-col overflow-x-hidden overflow-y-auto">
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
                    <>
                      <div
                        key={index}
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
                    </>
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
            disabled={
              form.Email.replace(/ /g, "") == "" ||
              form.Bedrooms.toString().replace(/ /g, "") == "" ||
              form.Bacloney.toString().replace(/ /g, "") == "" ||
              form.Price.toString().replace(/ /g, "") == "" ||
              form.Type.replace(/ /g, "") == "" ||
              form.FullName.replace(/ /g, "") == "" ||
              phone.length < 12 ||
              isLoading
            }
          >
            {isLoading ? t("sending") : t("send")}
          </button>
        </div>
        <div className="bg-fourth/40 space-y-6 text-white rounded-md shadow-lg backdrop-blur-[21px] p-8 border-[1px] border-t-white/70 border-l-white/70 border-white/40 w-full h-[45vh] md:max-h-[45vh] flex flex-col overflow-x-hidden overflow-y-auto">
          <div className="w-full flex items-center gap-x-6">
            <Button
              textColor={"text-primary"}
              text={"Upload Photos"}
              bgColor={"bg-secondary"}
              customStyle={"py-2 px-4"}
              borderRadius={6}
              onClick={(e) => {
                e.preventDefault();
                hiddenFileInput.current.click();
              }}
            />
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              multiple
              name="images"
              onChange={onImageChange}
              style={{ display: "none" }}
              ref={hiddenFileInput}
            />
            {imageURL.length !== 0 && (
              <div
                onClick={() => {
                  setImages([]);
                  setImageURL([]);
                }}
                className="text-center cursor-pointer flex items-center gap-x-1"
              >
                <DeleteAllIcon className="text-med" />
                <p className="text-smaller">Delete All</p>
              </div>
            )}
          </div>
          {imageURL.length !== 0 && (
            <Slider
              slidesToScroll={1}
              slidesToShow={imageURL.length <= 1 ? imageURL.length : 2}
              dots={true}
              arrows={true}
              infinite={false}
              className="max-h-[30vh] w-full"
            >
              {imageURL?.map((imageSrc, i) => {
                return (
                  <div
                    className="relative !h-[250px] !max-h-[250px] !w-[95%]"
                    key={i}
                  >
                    <img
                      className="h-full w-full"
                      src={imageSrc}
                      alt={"Guest Property Image" + i}
                    />
                    <div
                      className="text-center cursor-pointer flex items-center gap-x-1 absolute top-0 left-0 bg-primary/40 backdrop-blur-[21px] shadow-md rounded-br-md p-1"
                      onClick={() => {
                        let tempUrls = imageURL;
                        let newTempUrls = tempUrls.filter(
                          (img) => img !== imageSrc
                        );
                        let idx = tempUrls.indexOf(imageSrc);
                        let tempImages = images;
                        setImageURL(newTempUrls);
                        if (idx > -1) {
                          tempImages.splice(idx, 1);
                          setImages(tempImages);
                        }
                      }}
                    >
                      <DeleteIcon className="text-med" />
                    </div>
                  </div>
                );
              })}
            </Slider>
          )}
        </div>
      </div>
    </>
  );
};

export default ListingForm;
