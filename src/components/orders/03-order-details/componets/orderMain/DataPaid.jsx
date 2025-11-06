import { formatPrice } from "../../../../../utils/formatPrice";
import styles from "../../orderDetail.module.css";

export const DataPaid = ({ order }) => {
  return (
    <article className={styles.pedido__card}>
      <h3 style={{ textAlign: "center" }}>Pago</h3>
      <div className={`${styles.row} ${styles.flex} ${styles.sb}`}>
        <h4>Efectivo</h4>
        <h4>{formatPrice(order.payment.cash)}</h4>
      </div>
      <div className={`${styles.row} ${styles.flex} ${styles.sb}`}>
        <h4>Transferencia</h4>
        <h4>{formatPrice(order.payment.transfer)}</h4>
      </div>
      <div className={`${styles.row} ${styles.flex} ${styles.sb}`}>
        <h4>Debe</h4>
        <h4>{formatPrice(order.payment.debt)}</h4>
      </div>
      {order.commentary && (
        <>
          <div>
            <h3 style={{ textAlign: "center" }}>Comentario</h3>
          </div>
          <div className={`${styles.row} ${styles.flex} ${styles.sb}`}>
            <p>{order.commentary}</p>
          </div>
        </>
      )}
    </article>
  );
};
