import { dateToLocalDate } from "../../../../../utils/dateFormat";
import { formatPrice } from "../../../../../utils/formatPrice";
import styles from "../../orderDetail.module.css";

export const DataOrder = ({ order }) => {
  console.log(order);
  return (
    <article className={styles.pedido__card}>
      <h3 style={{ textAlign: "center" }}>Datos Pedido</h3>
      <div className={`${styles.row} ${styles.flex} ${styles.sb}`}>
        <h3>Estado</h3>
        <h3>
          <span className={styles[order.status.toLowerCase()]}>
            {order.status}
          </span>
        </h3>
      </div>
      {order.deliveryDate && (
        <div
          className={`${styles.row} ${styles.flex} ${styles.sb}`}
          style={{ paddingTop: "18px" }}
        >
          <h4>Horario de entrega</h4>
          <h4>{dateToLocalDate(order.deliveryDate)}hs</h4>
        </div>
      )}
      <span className={styles.products__titles}>
        <h4>Cant./Producto</h4>
        <h4>Total</h4>
      </span>
      {order.orderItems.map((item) => (
        <span className={styles.product} key={item._id}>
          <div className={styles.product__name}>
            <div className={styles.product__quantity}>{item.totalQuantity}</div>
            <p>
              {item.name}{" "}
              <span style={{ color: "#ccc" }}>
                {`(${formatPrice(item.totalPrice / item.totalQuantity)} und.) `}
              </span>
            </p>
          </div>
          <p style={{ fontWeight: 800 }}>{formatPrice(item.totalPrice)}</p>
        </span>
      ))}
      <div
        style={{ borderTop: "none" }}
        className={`${styles.row} ${styles.flex} ${styles.sb}`}
      >
        <h4>Subtotal</h4>
        <p>{formatPrice(order.subTotal)}</p>
      </div>
      <div className={`${styles.row} ${styles.flex} ${styles.sb}`}>
        <h4>Envío</h4>
        <p>${order.tax || 0}</p>
      </div>
      <div className={`${styles.row} ${styles.flex} ${styles.sb}`}>
        <p className={styles.bold}>Total</p>
        <h3>{formatPrice(order.total)}</h3>
      </div>
    </article>
  );
};
