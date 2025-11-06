/* eslint-disable no-undef */
import React, { useMemo } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import { optionZones, zones } from "../../data/Zones";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const MapOrder = ({ deliveryLocation, directions, addressCoords }) => {
  const navigate = useNavigate();
  const local = useMemo(
    () => ({ lat: -34.570428718491605, lng: -58.743382510475065 }),
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

  return (
    <div>
      <button className="btn__back" onClick={() => navigate(-1)}>
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

        <Polygon paths={zones.zona1} options={optionZones.zona1} />
        <Polygon paths={zones.zona2} options={optionZones.zona2} />
        <Polygon paths={zones.zona3} options={optionZones.zona3} />
        <Polygon paths={zones.zona4} options={optionZones.zona4} />
        <Polygon paths={zones.zona5} options={optionZones.zona5} />
        <Polygon paths={zones.zona6} options={optionZones.zona6} />
      </GoogleMap>
    </div>
  );
};
