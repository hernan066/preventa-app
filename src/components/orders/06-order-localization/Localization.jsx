import { MapOrder } from "./MapOrder";
import styles from "./localization.module.css";
import { useEffect } from "react";
import { useState } from "react";

export const Localization = ({ order, deliveryLocation, zones }) => {
  const [directions, setDirections] = useState(null);
  const addressCoords = {
    lat: order.shippingAddress?.lat || -34.570428718491605,
    lng: order.shippingAddress?.lng || -58.743382510475065,
  };

  useEffect(() => {
    const fetchDirections = () => {
      const origin = {
        lat: deliveryLocation?.lat || -34.570428718491605,
        lng: deliveryLocation?.lng || -58.743382510475065,
      };
      const service = new window.google.maps.DirectionsService();
      service.route(
        {
          origin,
          destination: addressCoords,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirections(result);
          }
        }
      );
    };

    if (deliveryLocation) {
      fetchDirections();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryLocation]);

  return (
    <div className={styles.localization__container}>
      <div className={styles.localization__map}>
        <MapOrder
          deliveryLocation={deliveryLocation}
          directions={directions}
          addressCoords={addressCoords}
          zones={zones}
        />
      </div>
      <div className={styles.localization__detail}>
        <div className={styles.localization__row}>
          <div>
            <p>Distancia</p>
          </div>
          <div>
            <span className={styles.localization__distance}>
              {directions && directions.routes[0].legs[0].distance.text}
            </span>
          </div>
        </div>
        <div className={styles.localization__row}>
          <div>
            <p>Tiempo estimado</p>
          </div>
          <div>
            <span className={styles.localization__time}>
              {directions && directions.routes[0].legs[0].duration.text}
            </span>
          </div>
        </div>
        <div className={styles.localization__row}>
          <div>
            <p>Dirección</p>
            <p className={styles.localization__textGrey}>
              {order.shippingAddress.address}
            </p>
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/mrprwema7/location_home_BMvJcc21T.png?updatedAt=1688475436747"
              alt="icono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
