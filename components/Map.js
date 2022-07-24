import { Alert, StyleSheet } from "react-native";
import React, { useRef, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";
import { GOOGLE_MAP_APIKEY } from "@env";
import MapViewDirections from "react-native-maps-directions";
const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  useEffect(() => {
    if (!origin || !destination) return;

    // Zoom n fit
    mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
      },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(
        "https://maps.googleapis.com/maps/api/distancematrix/json?destinations=New%20York%20City%2C%20NY&origins=Washington%2C%20DC&units=imperial&key=AIzaSyAqj1YyWB8T4IWvTmRyT8zsTuJnN-0vDD0"
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          dispatch(setTravelTimeInformation(data?.rows[0]?.elements[0]));
        })
        .catch((err) =>
          Alert.alert(
            "Error :getTravelTime",
            err?.message || "something went worng!"
          )
        );
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAP_APIKEY]);
  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      initialRegion={{
        latitude: origin?.location?.lat,
        longitude: origin?.location?.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      mapType="mutedStandard"
      provider={PROVIDER_GOOGLE}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin?.description}
          destination={destination?.description}
          apikey={GOOGLE_MAP_APIKEY}
          strokeColor="#000"
          strokeWidth={3}
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin?.location?.lat,
            longitude: origin?.location?.lng,
          }}
          title={"Origin"}
          description={origin?.description}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination?.location?.lat,
            longitude: destination?.location?.lng,
          }}
          title={"Destination"}
          description={destination?.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
