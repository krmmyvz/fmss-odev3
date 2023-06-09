import { createContext, useState, useEffect } from "react";
import Loading from "../content/Loading";

export const GeolocationContext = createContext();

export const GeolocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          if (error.code === error.PERMISSION_DENIED) {
            alert(
              "To see the weather in your location, please allow us to see your location."
            );
          } else {
            alert("Error getting location.");
          }
        }
      );
    } else {
      setLoading(false);
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <GeolocationContext.Provider value={{ location }}>
        {children}
      </GeolocationContext.Provider>
    );
  }
};
