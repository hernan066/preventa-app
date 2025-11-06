import { useState } from "react";
import styles from "./orderDetail.module.css";
import { OrderMain } from "./componets/orderMain/OrderMain";
import Loading from "../../loading/Loading";
import { useGetClientOrderDebtQuery } from "../../../api/apiOrders";
import { OrderPayment } from "../04-order-payment/OrderPayment";

export const OrderDetail = ({ order, id }) => {
  const [menu, setMenu] = useState(false);
  const { data: ordersDebt, isLoading: l2 } = useGetClientOrderDebtQuery(
    order.client
  );

  if (l2) {
    return <Loading />;
  }

  const unpaidOrders = ordersDebt?.data?.orders;

  return (
    <section
      className={styles.pedido__container}
      style={{ marginBottom: "50px" }}
    >
      {menu && <OrderPayment order={order} id={id} setMenu={setMenu} />}
      {!menu && (
        <OrderMain
          order={order}
          unpaidOrders={unpaidOrders}
          setMenu={setMenu}
        />
      )}
    </section>
  );
};
