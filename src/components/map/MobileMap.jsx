import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./MobileMap.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setNegocioPosicion } from "../../redux/mapSlice";

const MobileMap = () => {
  const dispatch = useDispatch();
  const { lat, lng } = useSelector((state) => state.map);
  const { latitude, longitude } = useSelector((state) => state.location);

  // Detectar posición actual del usuario

  // Manejar clics en el mapa
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        dispatch(setNegocioPosicion({ lat: e.latlng.lat, lng: e.latlng.lng }));
      },
    });
    return null;
  };

  return (
    <div className={styles.mobileMap}>
      <MapContainer
        center={
          latitude && longitude
            ? [latitude, longitude]
            : [-34.57673407889358, -58.74409231553139]
        }
        zoom={16}
        style={{ height: "70dvh", width: "100%" }}
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
