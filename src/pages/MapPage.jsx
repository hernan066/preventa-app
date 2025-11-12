import { useLoadScript } from "@react-google-maps/api";
import { useGetDeliveryZonesQuery } from "../api/deliveryZoneApi";
import { useGetNegociosQuery } from "../api/apiNegocio";
import Loading from "../components/loading/Loading";
import { Error } from "../components/error/Error";
import { useEffect } from "react";
import { FullMap } from "../components/map/fullMap/FullMap";



export const MapPage = () => {
  const {
    data: dataNegocios,
    isLoading: l1,
    isError: e1,
  } = useGetNegociosQuery();
  const {
    data: dataZones,
    isLoading: l2,
    isError: e2,
  } = useGetDeliveryZonesQuery();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APP_MAP_API_KEY,
    libraries: ["places", "visualization"],
  });
  useEffect(() => {
    if (isLoaded === true) {
      console.log("--------------------------");
      console.log("----Script map cargado----");
      console.log("--------------------------");
    }
  }, [isLoaded]);

  return (
    <>
      {(l1 || l2) && <Loading />}
      {e1 && e2 && <Error />}

      {dataNegocios && dataZones && isLoaded && (
        <FullMap
          dataNegocios={dataNegocios.negocios}
          zones={dataZones.data.deliveryZones}
        />
      )}
    </>
  );
};
