import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./password.module.css";
import * as Yup from "yup";
import { usePutUserChangePasswordMutation } from "../../api/apiUser";
import { useState } from "react";
import Swal from "sweetalert2";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignupSchema = Yup.object().shape({
  password: Yup.string().min(6, "6 caracteres mínimo").required("Requerido"),
  newPassword: Yup.string().min(6, "6 caracteres mínimo").required("Requerido"),
  newPassword2: Yup.string()
    .min(6, "6 caracteres mínimo")
    .required("Requerido")
    .oneOf([Yup.ref("newPassword")], "Las contraseñas deben ser iguales"),
});

export const ChangePassword = () => {
  const { user } = useSelector((state) => state.authDelivery);
  const id = user;
  const navigate = useNavigate();
  const [editUser, { isLoading, isError }] =
    usePutUserChangePasswordMutation(id);
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    try {
      const res = await editUser({ id, ...values }).unwrap();
      if (res.ok) {
        //dispatch(setMenu(false));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Contraseña cambiada con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate(`/user/${id}`);
      }
    } catch (error) {
      console.log(error);
      if (error.status === 400) {
        setError(error.data.msg);
      }
    }
  };

  return (
    <main className={styles.container}>
      <img
        src="https://ik.imagekit.io/mrprwema7/OurMarket/logo_ZbFW9zKm6.png?updatedAt=1761139121065"
        alt="logo"
        className={styles.logo__img}
      />
      <div className={styles.welcome_text}>
        <h2>Cambiar contraseña</h2>
        <p>Ingresa los siguientes datos para cambiar de contraseña</p>
      </div>
      <div className={styles.btn_container}>
        <Formik
          initialValues={{
            password: "",
            newPassword: "",
            newPassword2: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={styles.input_group}>
                <label htmlFor="password">Contraseña Actual</label>
                <Field
                  type="password"
                  name="password"
                 
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className={styles.password_error}
                />
              </div>
              <div className={styles.input_group}>
                <label htmlFor="newPassword">Nueva Contraseña</label>
                <Field
                  type="password"
                  name="newPassword"
                 
                />
                <ErrorMessage
                  name="newPassword"
                  component="p"
                  className={styles.password_error}
                />
              </div>
              <div className={styles.input_group}>
                <label htmlFor="newPassword2">Repetir Nueva Contraseña</label>
                <Field
                  type="password"
                  name="newPassword2"
                   
                />
                <ErrorMessage
                  name="newPassword2"
                  component="p"
                  className={styles.password_error}
                />
              </div>
              {error && <p style={{ color: "red" }}>{}</p>}
              <button
                style={{ marginTop: "10px" }}
                className={`btn__estado btn-load  ${
                  isLoading ? "button--loading" : ""
                }`}
                type="submit"
                disabled={isLoading}
              >
                <span className={styles.button__text}>Enviar</span>
              </button>
              {isError && (
                <p className={styles.form__error}>
                  ❌Error, tu password no se ha cambiado
                </p>
              )}
              {error && <p className={styles.form__error}>{error}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};
