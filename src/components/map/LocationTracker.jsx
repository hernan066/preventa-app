// src/components/LocationTracker.jsx
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPosition, setError } from "../../redux/locationSlice";

const LocationTracker = () => {
  const dispatch = useDispatch();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      dispatch(setError("La geolocalización no está soportada por este navegador."));
      return;
    }

    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          dispatch(
            setPosition({
              latitude,
              longitude,
              accuracy,
              timestamp: pos.timestamp,
            })
          );
        },
        (err) => {
          dispatch(setError(err.message));
        },
        {
          enableHighAccuracy: false, // suficiente para ubicaciones generales
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    };

    const startTracking = () => {
      // evitar duplicar intervalos
      if (intervalRef.current) return;
      updateLocation();
      intervalRef.current = setInterval(updateLocation, 60000); // cada 1 min
    };

    const stopTracking = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    // Iniciar seguimiento al montar
    startTracking();

    // Pausar/reanudar según visibilidad
    const handleVisibilityChange = () => {
      if (document.hidden) stopTracking();
      else startTracking();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Limpiar al desmontar
    return () => {
      stopTracking();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [dispatch]);

  return null;
};

export default LocationTracker;
