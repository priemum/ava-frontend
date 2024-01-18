import React, { useEffect, useRef, useState } from "react";
import locationIcon from "../../../assets/icons/pro-location-icon.svg";
import { useTranslation } from "react-i18next";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMapsLibrary,
  useMap,
  // Marker,
  // InfoWindow,
  // ControlPosition,
  // MapControl,
  // useMarkerRef,
} from "@vis.gl/react-google-maps";
import Directions from "./Directions";

const Location = ({ data }) => {
  const { t, i18n } = useTranslation();
  const [endDirection, setEndDirection] = useState({ lat: "", lng: "" });
  return (
    data?.Latitude &&
    data?.Longitude && (
      <div className="mt-12">
        <div className="flex items-center self-start flex-1">
          <img src={locationIcon} alt="property Icon" />
          <p className="text-small sm:text-med font-bold">
            {t("LocationAndNearby")}
          </p>
        </div>
        <div className="h-[600px] rounded-md overflow-hidden">
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY ?? ""}>
            <Map
              zoom={14}
              center={{ lat: data?.Latitude, lng: data?.Longitude }}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
              mapId={import.meta.env.VITE_GOOGLE_MAP_ID ?? ""}
            >
              {endDirection.lat !== "" && endDirection.lng !== "" ? (
                <Directions
                  startLng={data.Longitude}
                  startLat={data.Latitude}
                  endLng={endDirection.lng}
                  endLat={endDirection.lat}
                />
              ) : (
                <AdvancedMarker
                  position={{ lat: data?.Latitude, lng: data?.Longitude }}
                />
              )}
            </Map>
          </APIProvider>
        </div>
      </div>
    )
  );
};

export default Location;
