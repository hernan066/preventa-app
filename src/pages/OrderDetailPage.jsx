import { useParams } from "react-router-dom";
import { useGetOrderQuery } from "../api/apiOrders";
import Loading from "../components/loading/Loading";
import { OrderDetail } from "../components/orders/03-order-details/OrderDetail";

export const OrderDetailPage = () => {
  const { id } = useParams();
  const { data: orderData, isLoading: l1 } = useGetOrderQuery(id);

  return (
    <>
      {l1 ? <Loading /> : <OrderDetail order={orderData.data.order} id={id} />}
    </>
  );
};
