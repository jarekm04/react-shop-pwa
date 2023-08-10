import { useEffect, useState } from "react";

export const useGeolocation = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const options = {
        enableHighAccuracy: true,
        maximumAge: 60000,
        timeout: 5000,
      };

      const successCallback = (position) => {
        setPosition(position.coords);
      };

      const errorCallback = (error) => {
        setError(error);
      };

      const watchId = navigator.geolocation.watchPosition(
        successCallback,
        errorCallback,
        options
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, []);

  return { position, error };
}