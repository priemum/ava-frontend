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
import LocationInfoNav from "./LocationInfoNav";

const Location = ({ data }) => {
  const { t } = useTranslation();
  const [endDirection, setEndDirection] = useState({ lat: "", lng: "" });
  const [routeData, setRouteData] = useState({});
  useEffect(() => {
    if (data.Longitude && data.Latitude) {
      const url =
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
        data.Latitude +
        `,` +
        data.Longitude +
        "&radius=" +
        1500 +
        "&type=" +
        "atm" +
        "&key=" +
        import.meta.env.VITE_GOOGLE_API_KEY;
      fetch(url)
        .then((res) => {
          console.log(res.json());
          return res.json();
        })
        // .then((res) => {
        //   for (let googlePlace of res.results) {
        //     var places = [];
        //     var place = {};
        //     var myLat = googlePlace.geometry.location.lat;
        //     var myLong = googlePlace.geometry.location.lng;
        //     var coordinate = {
        //       latitude: myLat,
        //       longitude: myLong,
        //     };
        //     place[`placeTypes`] = googlePlace.types;
        //     place[`coordinate`] = coordinate;
        //     place[`placeId`] = googlePlace.place_id;
        //     place[`placeName`] = googlePlace.name;
        //     places.push(place);
        //   }
        //   // Show all the places around 4 km from San Francisco.
        //   console.log(places.map((nearbyPlaces) => nearbyPlaces.placeName));
        // })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [data.Longitude, data.Latitude]);
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
          />

          <div className="h-[600px] rounded-md overflow-hidden relative">
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY ?? ""}>
              <Map
                zoom={14}
                center={{ lat: data?.Latitude, lng: data?.Longitude }}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
                mapId={import.meta.env.VITE_GOOGLE_MAP_ID ?? ""}
                scrollwheel={false}
              >
                {endDirection.lat !== "" && endDirection.lng !== "" ? (
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
