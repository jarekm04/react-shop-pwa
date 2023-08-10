import { useEffect, useState } from "react";

export interface GeolocationPosition {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export interface GeolocationError {
  code: number;
  message: string;
}

export interface GeolocationHookResult {
  position: GeolocationPosition | null;
  error: GeolocationError | null;
}

export const useGeolocation = (): GeolocationHookResult => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationError | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const options: PositionOptions = {
        enableHighAccuracy: true,
        maximumAge: 60000,
        timeout: 5000,
      };

      const successCallback: PositionCallback = (position) => {
        setPosition(position.coords);
      };

      const errorCallback: PositionErrorCallback = (error) => {
        setError(error);
      };

      const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, options);

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, []);

  return { position, error };
};
