import { useParams } from "react-router-dom";
import { useGetOrderQuery } from "../api/apiOrders";
import Loading from "../components/loading/Loading";
import { DebtOrderDetails } from "../components/orders/05-orders-unpaid/DebtOrderDetails";

export const OrderDetailUnpaidPage = () => {
  const { id } = useParams();
  const { data: orderData, isLoading: l1 } = useGetOrderQuery(id);

  return (
    <>{l1 ? <Loading /> : <DebtOrderDetails order={orderData.data.order} />}</>
  );
};
