/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useMemo } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./localization.module.css";

export const MapOrder = ({
  deliveryLocation,
  directions,
  addressCoords,
  zones,
}) => {
  const navigate = useNavigate();
  const { superUserData } = useSelector((store) => store.authDelivery);
  const local = useMemo(
    () => ({ lat: superUserData.lat, lng: superUserData.lng }),
    []
  );
  const center = useMemo(
    () => ({ lat: deliveryLocation.lat, lng: deliveryLocation.lng }),
    [deliveryLocation]
  );
  const options = useMemo(
    () => ({
      clickableIcons: false,
      disableDefaultUI: true,
      styles: [
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
      ],
    }),
    []
  );

  const deliveryZones = zones.map((zone) => ({
    id: zone._id,
    path: zone.mapLimits,
    option: {
      fillColor: zone.fillColor,
      fillOpacity: 0.2,
      strokeColor: "blue",
      strokeOpacity: 1,
      strokeWeight: 2,
      clickable: false,
      draggable: false,
      editable: false,
      geodesic: false,
      zIndex: 1,
    },
  }));

  return (
    <div>
      <button className={styles.btn__back} onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack />
      </button>
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerClassName="map-container"
        options={options}
      >
        <Marker position={local} icon="https://i.ibb.co/nbm4b4x/pngegg.png" />
        <Marker
          position={addressCoords}
          icon="https://ik.imagekit.io/mrprwema7/location_home_mini_3a5vLgNLS.png?updatedAt=1688481608465"
        />

        <Marker
          position={center}
          icon="https://i.ibb.co/p0vpNJ6/6643396-1.png"
        />

        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                zIndex: -1,
                strokeColor: "#b70b0b74 ",
                strokeWeight: 5,
              },
              suppressMarkers: true,
              preserveViewport: true,
            }}
          />
        )}

        {deliveryZones.map((zone) => (
          <Polygon key={zone.id} paths={zone.path} options={zone.option} />
        ))}
      </GoogleMap>
    </div>
  );
};
