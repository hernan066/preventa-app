import { dateToLocalDate } from "../../../utils/dateFormat";
import { formatQuantity } from "../../../utils/quantityFormat";
import styles from "./order-list.module.css";
import { Link } from "react-router-dom";

export const OrderListCard = ({ order }) => {
  return (
    <Link to={`/home/order/${order._id}`}>
      <div className={styles.order__card__container}>
        <div className={styles.row}>
          <h4>Distancia</h4>
          <p className={styles.order__card__distance}>{`${formatQuantity(
            order.distance
          )}km`}</p>
        </div>
        <div className={styles.row}>
          <h4>Nombre</h4>
          <p>
            {order.shippingAddress.name + " " + order.shippingAddress.lastName}
          </p>
        </div>
        <div className={styles.row}>
          <h4>Dirección</h4>
          <p>{order.shippingAddress.address}</p>
        </div>
        <div className={styles.row}>
          <h4>Creado</h4>
          <p>{dateToLocalDate(order.createdAt)}hs</p>
        </div>
        <div className={styles.row}>
          <h4>Estado</h4>
          <p>
            <span
              className={`${styles.order__status_circle} ${
                styles[order.status.toLowerCase()]
              }`}
            ></span>{" "}
            {order.status}
          </p>
        </div>
      </div>
    </Link>
  );
};
