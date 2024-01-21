import { useRef, useEffect, useState } from "react";
import CustomInput from "../../../components/Forms/CustomInput";
import { useTranslation } from "react-i18next";
import Button from "../../../components/UI/Button";
import { NearbyTypes } from "../../../constants";
import { MdExpandMore } from "react-icons/md";
const LocationInfoNav = ({
  setEndDirection,
  routeData,
  setRouteData,
  setNearbyLocations,
  setNearbyType,
  nearbyType,
  data,
}) => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const { t, i18n } = useTranslation();
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

  useEffect(() => {
    const performNearbySearch = async () => {
      const map = window.google.maps; // Access the Google Maps API objects

      const service = new map.places.PlacesService(
        document.createElement("div")
      );

      const request = {
        location: new map.LatLng(data.Latitude, data.Longitude), // Replace with your specific location coordinates
        radius: 4000, // Specify the radius in meters
        type: nearbyType, // You can change the type of places you're looking for
      };

      service.nearbySearch(request, (results, status) => {
        if (status === map.places.PlacesServiceStatus.OK) {
          setNearbyLocations(results);
        }
      });
    };

    if (nearbyType !== "") performNearbySearch();
  }, [nearbyType]);

  return (
    <div
      className="flex max-md:flex-col max-md:space-y-3 items-center gap-x-5"
      id="map"
    >
      <CustomInput
        inputRef={inputRef}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t("searchPlace")}
        customStyle={"!text-white placeholder:text-white"}
        containerStyle={"!bg-primary/60 w-full md:max-w-[300px]"}
      />
      <CustomInput
        value={
          NearbyTypes.find((x) => x.value == nearbyType)?.lng[i18n.language]
        }
        customStyle={"!text-white placeholder:text-white"}
        containerStyle={"!bg-primary/60 w-full md:max-w-[300px]"}
        placeholder={t("PickNearby")}
        inputType="text"
        translatedOptions={NearbyTypes}
        setState={setNearbyType}
        state={nearbyType}
        singleState
        reverseIcon
        icon={<MdExpandMore className="text-smaller" />}
        select
        readOnly
      />
      <Button
        bgColor={`bg-secondary ${
          searchTerm == "" && nearbyType == "" && "hidden"
        }`}
        borderRadius={200}
        text={t("Clear")}
        disabled={searchTerm == "" && nearbyType == ""}
        onClick={async () => {
          setSearchTerm("");
          setEndDirection({ lng: "", lat: "" });
          setRouteData({});
          setNearbyType("");
          setNearbyLocations("");
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
