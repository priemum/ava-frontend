import React, { useEffect, useRef, useState } from "react";
import locationIcon from "../../../assets/icons/pro-location-icon.svg";
import { useTranslation } from "react-i18next";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Marker,
} from "@vis.gl/react-google-maps";
import Directions from "./Directions";
import LocationInfoNav from "./LocationInfoNav";

const Location = ({ data }) => {
  const { t } = useTranslation();
  const [endDirection, setEndDirection] = useState({ lat: "", lng: "" });
  const [routeData, setRouteData] = useState({});
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [nearbyType, setNearbyType] = useState("");

  // performNearbySearch();

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
        <div className="p-2 md:p-4 bg-white rounded-md  space-y-3 md:space-y-4">
          <LocationInfoNav
            setEndDirection={setEndDirection}
            routeData={routeData}
            setRouteData={setRouteData}
            setNearbyType={setNearbyType}
            nearbyType={nearbyType}
            setNearbyLocations={setNearbyLocations}
            data={data}
          />

          <div className="h-[600px] rounded-md overflow-hidden relative">
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY ?? ""}>
              <Map
                id="map"
                zoom={14}
                center={{ lat: data?.Latitude, lng: data?.Longitude }}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
                mapId={import.meta.env.VITE_GOOGLE_MAP_ID ?? ""}
              >
                {nearbyLocations.length !== 0 ? (
                  nearbyLocations.map((location) => (
                    <Marker
                      key={location.place_id}
                      position={{
                        lat: location.geometry.location.lat(),
                        lng: location.geometry.location.lng(),
                      }}
                    />
                  ))
                ) : endDirection.lat !== "" && endDirection.lng !== "" ? (
                  <Directions
                    startLng={data.Longitude}
                    startLat={data.Latitude}
                    endLng={endDirection.lng}
                    endLat={endDirection.lat}
                    setRouteData={setRouteData}
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
      </div>
    )
  );
};

export default Location;
