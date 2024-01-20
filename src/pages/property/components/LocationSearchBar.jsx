import { useRef, useEffect, useState } from "react";
import CustomInput from "../../../components/Forms/CustomInput";
import { useTranslation } from "react-i18next";
const AutoComplete = ({ setEndDirection }) => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const options = {
    componentRestrictions: { country: "ae" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"],
  };
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      console.log({ place });
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setEndDirection({
        lng: lng,
        lat: lat,
      });
    });
  }, []);
  return (
    <CustomInput
      inputRef={inputRef}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder={t("searchPlace")}
      customStyle={"!text-white placeholder:text-white"}
      containerStyle={"!bg-primary/80  w-full max-w-[300px]"}
    />
  );
};
export default AutoComplete;
