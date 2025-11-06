/* eslint-disable react-hooks/exhaustive-deps */
import { useLoadScript } from "@react-google-maps/api";
import Loading from "../components/loading/Loading";
import { useGetOrderQuery } from "../api/apiOrders";
import { useParams } from "react-router-dom";
import { Error } from "../components/error/Error";
import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";
import { useGetDeliveryZonesQuery } from "../api/deliveryZoneApi";
import { Localization } from "../components/orders/06-order-localization/Localization";

export const LocalizationPage = () => {
  const { id } = useParams();
  const { data: orderData, isLoading: l1, isError: e1 } = useGetOrderQuery(id);
  const {
    data: dataZones,
    isLoading: l2,
    isError: e2,
  } = useGetDeliveryZonesQuery();

  const { data: deliveryLocation } = useContext(LocationContext);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.REACT_APP_MAP_API_KEY,
    libraries: ["places", "visualization"],
    language: "ES",
  });

  return (
    <>
      {(l1 || l2) && <Loading />}
      {(e1 || e2) && <Error />}
      {orderData && deliveryLocation && dataZones && isLoaded && (
        <Localization
          order={orderData.data.order}
          deliveryLocation={deliveryLocation}
          zones={dataZones.data.deliveryZones}
        />
      )}
    </>
  );
};
