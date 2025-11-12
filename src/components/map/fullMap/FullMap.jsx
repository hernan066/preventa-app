import { GoogleMap, InfoWindow, Marker, Polygon } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
        lat: data.lat,
        lng: data.lng,
      }}
      onClick={handleOpen}
      icon={
        data.esCliente
          ? "https://ik.imagekit.io/mrprwema7/geo-icon-16__2__FMgqGb84R.png?updatedAt=1686144731319"
          : null
      }
    >
      {open && (
        <InfoWindow
          position={{
            lat: data.lat,
            lng: data.lng,
          }}
          onCloseClick={handleClose}
        >
          <div style={divStyle}>
            <h2 style={{textTransform: 'capitalize'}}>{data.nombreNegocio}</h2>
            <h3 style={{textTransform: 'capitalize'}}>{data.categoria}</h3>
            <p>Horario de {data.horarioApertura}hs a {data.horarioCierre}hs</p>

            <Link style={{textDecoration:'underline'}} to={`/home/negocio/detalle/${data._id}`}>Ver Negocio</Link>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
}

export const FullMap = ({ dataNegocios, zones }) => {
  console.log(dataNegocios);
  const { superUserData } = useSelector((store) => store.authDelivery);
  const center = useMemo(
    () => ({ lat: superUserData.lat, lng: superUserData.lng }),
    []
  );

  const options = useMemo(
    () => ({
      clickableIcons: false,
      disableDefaultUI: false, // podés poner true para ocultar TODOS los controles
      streetViewControl: false, // oculta el muñeco de Street View
      mapTypeControl: false, // oculta el control de mapa/satélite
      fullscreenControl: false, // oculta el botón de pantalla completa
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
        zoom={12}
        center={center}
        mapContainerClassName="map-container"
        options={options}
      >
        <Marker
          position={center}
          icon="https://ik.imagekit.io/mrprwema7/OurMarket/home_5973800%20(1)_bn1AFnpE4.png?updatedAt=1701697209819"
        />

        {dataNegocios.map((order) => (
          <ClientMarker data={order} key={order._id} />
        ))}

        {deliveryZones.map((zone) => (
          <Polygon key={zone.id} paths={zone.path} options={zone.option} />
        ))}
      </GoogleMap>
    </div>
  );
};
