import "./auth.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../api/apiAuth";
import { setCredentials } from "../../redux/authSlice";
import { setUser } from "../../redux/userSlice";
import { useEffect, useState } from "react";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Formato inválido").required("Requerido"),
  clientId: Yup.string().required("Requerido"),
  password: Yup.string().min(6, "6 caracteres mínimo").required("Requerido"),
});

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);
  const [initialValues, setInitialValues] = useState({
    email: "",
    clientId: "",
    password: "",
  });

  const [loginDelivery, { isLoading, isError }] = useLoginMutation();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedClientId = localStorage.getItem("clientId");
    if (savedEmail || savedClientId) {
      setInitialValues({
        email: savedEmail || "",
        clientId: savedClientId || "",
        password: "",
      });
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const userData = await loginDelivery({
        email: values.email,
        password: values.password,
        clientId: values.clientId,
      }).unwrap();

      if (userData) {
        dispatch(setCredentials({ ...userData }));
        dispatch(setUser(userData.deliveryTruck));

        if (rememberMe) {
          localStorage.setItem("email", values.email);
          localStorage.setItem("clientId", values.clientId);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("clientId");
        }

        resetForm();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="auth__container">
      <img
        src="https://ik.imagekit.io/mrprwema7/OurMarket/logo_ZbFW9zKm6.png?updatedAt=1761139121065"
        alt="logo"
        className="logo__img"
      />
      <section className="auth__form">
        <div className="auth__form__container">
          <h2 className="title">Preventas</h2>
          {isError && (
            <p className="login__error">
              Error en el login, inténtelo nuevamente
            </p>
          )}
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="input__container">
                  <img
                    src="https://ik.imagekit.io/mrprwema7/OurMarket/ChatGPT%20Image%20Oct%2022,%202025,%2010_31_14%20AM_0dqnLsnrCi.png?updatedAt=1761139913500"
                    alt="icono usuario"
                  />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Ingresa tu email"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="login__error"
                />

                <div className="input__container">
                  <img
                    src="https://ik.imagekit.io/mrprwema7/OurMarket/ChatGPT%20Image%20Oct%2022,%202025,%2010_31_14%20AM_0dqnLsnrCi.png?updatedAt=1761139913500"
                    alt="icono cliente"
                  />
                  <Field
                    type="text"
                    name="clientId"
                    placeholder="Id del cliente"
                  />
                </div>
                <ErrorMessage
                  name="clientId"
                  component="p"
                  className="login__error"
                />

                <div className="input__container">
                  <img
                    src="https://ik.imagekit.io/mrprwema7/OurMarket/ChatGPT%20Image%20Oct%2022,%202025,%2010_28_25%20AM_m7q9iCQoYp.png?updatedAt=1761139913790"
                    alt="icono password"
                  />
                  <Field
                    type="password"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="login__error"
                />

                <div className="auth__form__remember">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="remember">Recordar</label>
                </div>

                <button
                  className={`btn-load ${isLoading ? "button--loading" : ""}`}
                  type="submit"
                  disabled={isLoading}
                >
                  <span className="button__text">Enviar</span>
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
};
