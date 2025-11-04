import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Error:", error);
          setError(error.message);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  return { userLocation, loading, error };
};

export default useGeolocation;