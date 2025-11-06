import { DataClient } from "./DataClient";
import { DataOrder } from "./DataOrder";
import { DataPaid } from "./DataPaid";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { PdfViewOrder } from "../orderRecipePdf/PdfViewOrder";
import { formatDateMonth } from "../../../../../utils/dateFormat";
import { useEffect } from "react";
import styles from "../../orderDetail.module.css";
import { useSelector } from "react-redux";

export const OrderMain = ({ order, unpaidOrders, setMenu }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { superUserData } = useSelector((store) => store.authDelivery);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  return (
    <>
      <h2 className={styles.detail__title}>
        <span onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack />
        </span>
        Datos orden
      </h2>
      <DataClient order={order} unpaidOrders={unpaidOrders} />
      <DataOrder order={order} unpaidOrders={unpaidOrders} />
      {order.payment?.cash || order.payment?.transfer || order.payment?.debt ? (
        <DataPaid order={order} />
      ) : null}
      <button className={`${styles.btn__estado}`} onClick={() => setMenu(true)}>
        Entregar Pedido
      </button>
      <button
        className={`${styles.btn__volver}`}
        onClick={() => navigate(`/home/ubicacion/${id}`)}
      >
        Ver Ruta
      </button>
      <PDFDownloadLink
        document={
          <PdfViewOrder
            order={order}
            unpaidOrders={unpaidOrders}
            superUserData={superUserData}
          />
        }
        fileName={`${order.shippingAddress.name}-${
          order.shippingAddress.lastName
        }-${formatDateMonth(order.createdAt)}.pdf`}
      >
        <button className={`${styles.btn__volver}`}>Descargar Factura</button>
      </PDFDownloadLink>
    </>
  );
};
