import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./MobileMap.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setNegocioPosicion } from "../../redux/mapSlice";

const MobileMap = () => {
  const dispatch = useDispatch();
  const [userPosition, setUserPosition] = useState(null);
  const { lat, lng } = useSelector((state) => state.map);

  // Detectar posición actual del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserPosition([latitude, longitude]);
        },
        (err) => console.error("Error al obtener ubicación:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Manejar clics en el mapa
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        dispatch(setNegocioPosicion({ lat: e.latlng.lat, lng: e.latlng.lng }));
      },
    });
    return null;
  };

  if (!userPosition) return <p>Cargando ubicación...</p>;

  return (
    <div className={styles.mobileMap}>
      <MapContainer
        center={userPosition}
        zoom={16}
        style={{ height: "70vh", width: "100%" }}
      >
        <>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <MapClickHandler />
          {lat && lng && <Marker position={[lat, lng]} />}
        </>
      </MapContainer>
    </div>
  );
};

export default MobileMap;
