/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import { GoogleMap, InfoWindow, Marker, Polygon } from "@react-google-maps/api";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

function ClientMarker({ data }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
    textAlign: "center",
  };
  return (
    <Marker
      position={{
        lat: data.shippingAddress.lat,
        lng: data.shippingAddress.lng,
      }}
      onClick={handleOpen}
      icon={
        data.status === "Entregado"
          ? "https://ik.imagekit.io/mrprwema7/geo-icon-16__2__FMgqGb84R.png?updatedAt=1686144731319"
          : null
      }
    >
      {open && (
        <InfoWindow
          position={{
            lat: data.shippingAddress.lat,
            lng: data.shippingAddress.lng,
          }}
          onCloseClick={handleClose}
        >
          <div style={divStyle}>
            <h2>
              {data.shippingAddress.name} {data.shippingAddress.lastName}
            </h2>
            <h3>{data.shippingAddress.address}</h3>
            <h3>Estado: {data.status}</h3>
            <h3>{formatPrice(data.total)}</h3>
            <h3 style={{ marginBottom: "5px" }}>{data.deliveryZone.name}</h3>
            <Link
              to={`/home/order/${data._id}`}
              style={{
                color: "blue",
                lineHeight: "1px",
                fontSize: "18px",
                display: "block",
                marginTop: "15px",
              }}
            >
              -Ver Orden-
            </Link>
            <br />
            <a
              style={{
                color: "blue",
                marginBottom: "5px",
                fontSize: "18px",
              }}
              href={`https://maps.google.com/?q=${data.shippingAddress.lat},${data.shippingAddress.lng}`}
              target="_blank"
              rel="noreferrer"
            >
              -Ruta GPS-
            </a>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
}

export const AllOrdersMap = ({ data, zones, orders }) => {
  console.log(zones);
  const { superUserData } = useSelector((store) => store.authDelivery);
  const local = useMemo(
    () => ({ lat: superUserData.lat, lng: superUserData.lng }),
    []
  );
  const center = useMemo(() => ({ lat: data.lat, lng: data.lng }), [data]);
  const options = useMemo(
    () => ({
      clickableIcons: false,
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
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerClassName="AllOrdersMap-container"
        options={options}
      >
        <Marker position={local} icon="https://i.ibb.co/nbm4b4x/pngegg.png" />

        <Marker
          position={center}
          icon="https://i.ibb.co/p0vpNJ6/6643396-1.png"
        />
        {orders.map((data) => (
          <ClientMarker data={data} />
        ))}
        {deliveryZones.map((zone) => (
          <Polygon key={zone.id} paths={zone.path} options={zone.option} />
        ))}
      </GoogleMap>
    </div>
  );
};
