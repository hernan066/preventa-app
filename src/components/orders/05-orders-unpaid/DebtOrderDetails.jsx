import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataOrder } from "../03-order-details/componets/orderMain/DataOrder";
import { DataPaid } from "../03-order-details/componets/orderMain/DataPaid";
import styles from "./debtOrderDetails.module.css";

export const DebtOrderDetails = ({ order }) => {
  const navigate = useNavigate();

  return (
    <section className={styles.debtOrderDetails__container}>
      <h2>
        <span onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack />
        </span>
        Orden impaga
      </h2>
      <DataOrder order={order} />
      {(order.payment?.cash ||
        order.payment?.transfer ||
        order.payment?.debt) && <DataPaid order={order} />}
    </section>
  );
};
