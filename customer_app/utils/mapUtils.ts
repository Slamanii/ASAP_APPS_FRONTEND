import Constants from "expo-constants";
import { Coordinates, FitAllParams } from "./my_types";

const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey ?? "";

export const fitAll = ({
  mapRef,
  pickup,
  destination,
  selectedRider,
}: FitAllParams) => {
  const coords: Coordinates[] = [];

  if (pickup) coords.push(pickup);
  if (destination) coords.push(destination);
  if (selectedRider) coords.push(selectedRider);

  if (coords.length && mapRef.current) {
    mapRef.current.fitToCoordinates(coords, {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      animated: true,
    });
  }
};

export const reverseGeocode = async (lat: number, lng: number) => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`,
  );

  const data = await res.json();
  const result = data.results?.[0];

  console.log("Reverse geocode response:", data);

  if (!result) return null;

  return result.formatted_address;
};
