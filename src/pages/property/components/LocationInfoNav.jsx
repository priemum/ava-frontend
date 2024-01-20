import { useRef, useEffect, useState } from "react";
import CustomInput from "../../../components/Forms/CustomInput";
import { useTranslation } from "react-i18next";
import Button from "../../../components/UI/Button";
const LocationInfoNav = ({ setEndDirection, routeData, setRouteData }) => {
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
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setEndDirection({
        lng: lng,
        lat: lat,
      });
      setSearchTerm(place.name);
    });
  }, []);

  return (
    <div className="flex max-md:flex-col max-md:space-y-3 items-center gap-x-5">
      <CustomInput
        inputRef={inputRef}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t("searchPlace")}
        customStyle={"!text-white placeholder:text-white"}
        containerStyle={"!bg-primary/60 w-full md:max-w-[300px]"}
      />
      <Button
        bgColor={`bg-secondary ${searchTerm == "" && "hidden"}`}
        borderRadius={200}
        text={t("Clear")}
        disabled={searchTerm == ""}
        onClick={() => {
          setSearchTerm("");
          setEndDirection({ lng: "", lat: "" });
          setRouteData({});
        }}
        customStyle={"px-5 max-md:w-full"}
      />
      {Object.keys(routeData).length !== 0 && (
        <div className="flex items-center gap-x-4">
          <p className="font-semibold text-smaller md:text-small">
            {routeData.distance.text}
          </p>
          <p className="font-semibold text-smaller md:text-small">
            {routeData.duration.text}
          </p>
        </div>
      )}
    </div>
  );
};
export default LocationInfoNav;
