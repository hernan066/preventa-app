import style from "./css.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { usePutNegocioMutation } from "../../../api/apiNegocio";
import { IoArrowBack } from "react-icons/io5";
import Swal from "sweetalert2";

const SignupSchema = Yup.object().shape({
  nombreNegocio: Yup.string().required("Requerido"),
  direccion: Yup.string().required("Requerido"),
  categoria: Yup.string().required("Selecciona una categoría"),
  potencial: Yup.string().required("Selecciona el potencial del negocio"),
});

export const EditarNegocio = ({ negocio }) => {
  const navigate = useNavigate();

  const [updateNegocio, { isLoading: isUpdating, isError }] =
    usePutNegocioMutation();

  const initialValues = {
    nombreNegocio: negocio?.nombreNegocio || "",
    nombreDueño: negocio?.nombreDueño || "",
    direccion: negocio?.direccion || "",
    telefono: negocio?.telefono || "",
    categoria: negocio?.categoria || "",
    horarioApertura: negocio?.horarioApertura || "",
    horarioCierre: negocio?.horarioCierre || "",
    potencial: negocio?.potencial || "",
    fueVisitado: negocio?.fueVisitado || false,
    esCliente: negocio?.esCliente || false,
    productosQueCompra: negocio?.informacionAdicional.productosQueCompra || "",
    productosQueLeInteresan:
      negocio?.informacionAdicional.productosQueLeInteresan || "",
    distribuidorActual: negocio?.informacionAdicional.distribuidorActual || "",
  };

  const handleSubmit = async (values) => {
    try {
      const data = {
        id: negocio._id,
        ...values,
        potencial: Number(values.potencial),
      };
      await updateNegocio(data).unwrap();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Negocio actualizado!",
      });
      navigate("/home/negocios/lista");
    } catch (error) {
      console.error("Error al actualizar negocio:", error);
    }
  };

  return (
    <main className={style.container}>
      <button className={style.back_button} onClick={() => navigate(-1)}>
        <IoArrowBack />
      </button>
      <div className={style.welcome_text}>
        <h2>Editar Negocio</h2>
      </div>

      <div className={style.btn_container}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              {/* Nombre del negocio */}
              <div className={style.input__container}>
                <label htmlFor="nombreNegocio">Nombre del negocio (*)</label>
                <Field type="text" name="nombreNegocio" />
              </div>
              <ErrorMessage
                name="nombreNegocio"
                component="p"
                className="login__error"
              />

              {/* Nombre del dueño */}
              <div className={style.input__container}>
                <label htmlFor="nombreDueño">Nombre del dueño </label>
                <Field type="text" name="nombreDueño" />
              </div>
              <ErrorMessage
                name="nombreDueño"
                component="p"
                className="login__error"
              />

              {/* Dirección */}
              <div className={style.input__container}>
                <label htmlFor="direccion">Dirección del negocio (*)</label>
                <Field type="text" name="direccion" />
              </div>
              <ErrorMessage
                name="direccion"
                component="p"
                className="login__error"
              />

              {/* Teléfono */}
              <div className={style.input__container}>
                <label htmlFor="telefono">Teléfono</label>
                <Field type="text" name="telefono" />
              </div>
              <ErrorMessage
                name="telefono"
                component="p"
                className="login__error"
              />

              {/* Categoría */}
              <div className={style.input__container}>
                <label htmlFor="categoria">Tipo de negocio (*)</label>
                <Field as="select" name="categoria">
                  <option value="">Selecciona una opción</option>
                  <option value="polleria">Pollería</option>
                  <option value="carniceria">Carnicería</option>
                  <option value="almacen">Almacén</option>
                  <option value="kiosco">Kiosco</option>
                  <option value="supermercado">Supermercado</option>
                  <option value="rotiseria">Rotisería</option>
                  <option value="parrilla">Parrilla</option>
                  <option value="restaurant">Restaurante</option>
                </Field>
              </div>
              <ErrorMessage
                name="categoria"
                component="p"
                className="login__error"
              />

              {/* Horario apertura */}
              <div className={style.input__container}>
                <label htmlFor="horarioApertura">Horario de apertura</label>
                <Field as="select" name="horarioApertura">
                  <option value="">Selecciona un horario</option>
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={String(i).padStart(2, "0")}>
                      {String(i).padStart(2, "0")} hs
                    </option>
                  ))}
                </Field>
              </div>
              <ErrorMessage
                name="horarioApertura"
                component="p"
                className="login__error"
              />

              {/* Horario cierre */}
              <div className={style.input__container}>
                <label htmlFor="horarioCierre">Horario de cierre</label>
                <Field as="select" name="horarioCierre">
                  <option value="">Selecciona un horario</option>
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={String(i).padStart(2, "0")}>
                      {String(i).padStart(2, "0")} hs
                    </option>
                  ))}
                </Field>
              </div>
              <ErrorMessage
                name="horarioCierre"
                component="p"
                className="login__error"
              />

              {/* Potencial */}
              <div className={style.input__container}>
                <label htmlFor="potencial">Potencial del negocio (*)</label>
                <Field as="select" name="potencial">
                  <option value="">Selecciona un nivel</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} {"★".repeat(n)}
                    </option>
                  ))}
                </Field>
              </div>
              <ErrorMessage
                name="potencial"
                component="p"
                className="login__error"
              />

              {/* Checkboxes */}
              <div className={style.checkbox_container}>
                <label>
                  <Field type="checkbox" name="fueVisitado" />
                  Ya fue visitado?
                </label>
                <label>
                  <Field type="checkbox" name="esCliente" />
                  Es cliente?
                </label>
              </div>

              <h4>Información adicional</h4>

              {/* Textareas */}
              <div className={style.input__container}>
                <label htmlFor="productosQueCompra">Productos que compra</label>
                <Field as="textarea" name="productosQueCompra" />
              </div>

              <div className={style.input__container}>
                <label htmlFor="productosQueLeInteresan">
                  Productos que le interesan
                </label>
                <Field as="textarea" name="productosQueLeInteresan" />
              </div>

              <div className={style.input__container}>
                <label htmlFor="distribuidorActual">Distribuidor actual</label>
                <Field type="text" name="distribuidorActual" />
              </div>

              {/* Botón enviar */}
              <button
                className={`btn-load ${isUpdating ? "button--loading" : ""}`}
                type="submit"
                disabled={isUpdating}
              >
                <span className="button__text">Actualizar</span>
              </button>
              {isError && (
                <p className="login__error">
                  Error al actualizar el negocio, intenta nuevamente.
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};
