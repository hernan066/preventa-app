import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { usePutOrderMutation } from "../../../api/apiOrders";
import * as Yup from "yup";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect } from "react";
import styles from "./orderPayment.module.css";

const SignupSchema = Yup.object().shape({
  status: Yup.string().required("Requerido"),
});

export const OrderPayment = ({ order, id, setMenu }) => {
  const [cash, setCash] = useState(order?.payment?.cash || 0);
  const [transfer, setTransfer] = useState(order?.payment?.transfer || 0);
  const [debt, setDebt] = useState(order?.payment?.debt || 0);
  const [editOrder, { isLoading: l1, isError: e1 }] = usePutOrderMutation();

  const handleSubmit = async (values) => {
    const data = {
      status: values.status,
      commentary: values.commentary,
      deliveryDate: order.deliveryDate ? order.deliveryDate : new Date(),
      paid: +cash + +transfer === order.total,
      payment: {
        cash: +cash || 0,
        debt: +debt || 0,
        transfer: +transfer || 0,
      },
    };

    await editOrder({ id, ...data }).unwrap();

    if (order) {
      setMenu(false);
    }
  };

  const handlerCash = () => {
    const rest = order.total - transfer - debt;
    setCash(rest);
  };

  const handlerTransfer = () => {
    const rest = order.total - cash - debt;
    setTransfer(rest);
  };

  const handlerDebt = () => {
    const rest = order.total - transfer - cash;
    setDebt(rest);
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  return (
    <div className={styles.OrderPayment__container}>
      <h2>
        <span onClick={() => setMenu(false)}>
          <IoMdArrowRoundBack />
        </span>
        Entregar Pedido
      </h2>
      <div className={styles.OrderPayment__card}>
        <h3>Datos del pedido</h3>
        <hr />
        <Formik
          initialValues={{
            status: order.status,
            cash: cash,
            debt: debt,
            transfer: transfer,
            commentary: order?.commentary || undefined,
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label htmlFor="">Estado</label>
              <Field as="select" name="status">
                <option value="" disable="true">
                  Seleccionar estado del pedido
                </option>
                <option value="Entregado">Entregado</option>
                <option value="Rechazado">Rechazado</option>
              </Field>
              <ErrorMessage
                name="status"
                component="p"
                className={styles.login__error}
              />

              <label htmlFor="">Efectivo</label>
              <Field
                type="number"
                name="cash"
                placeholder="$"
                value={cash}
                onChange={(e) => setCash(e.target.value)}
              />
              <ErrorMessage
                name="cash"
                component="p"
                className={styles.login__error}
              />

              <label htmlFor="">Transferencia</label>
              <Field
                type="number"
                name="transfer"
                placeholder="$"
                value={transfer}
                onChange={(e) => setTransfer(e.target.value)}
              />
              <ErrorMessage
                name="transfer"
                component="p"
                className={styles.login__error}
              />

              <label htmlFor="">Debe</label>
              <Field
                type="number"
                name="debt"
                placeholder="$"
                value={debt}
                onChange={(e) => setDebt(e.target.value)}
              />
              <ErrorMessage
                name="debt"
                component="p"
                className={styles.login__error}
              />

              <label htmlFor="">Comentarios</label>
              <Field
                as="textarea"
                type="commentary"
                name="commentary"
                placeholder="Agregar algún comentario de ser necesario..."
                cols="20"
                rows="3"
              />
              <ErrorMessage
                name="commentary"
                component="p"
                className={styles.login__error}
              />

              {e1 && (
                <p style={{ color: "red" }}>
                  Ha ocurrido un error, orden no editada
                </p>
              )}

              <div className={styles["autocomplete-btn__container"]}>
                <div onClick={handlerCash}>Efectivo</div>
                <div onClick={handlerTransfer}>Transf.</div>
                <div onClick={handlerDebt} id={styles.autocomplete_btn_debt}>
                  Debe
                </div>
              </div>

              <button
                className={`btn__estado btn-load  ${
                  l1 ? "button--loading" : ""
                }`}
                type="submit"
                disabled={l1}
              >
                <span className="button__text">Enviar</span>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
