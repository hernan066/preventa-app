import style from "./css.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { usePutNegocioMutation } from "../../../api/apiNegocio";
import { IoArrowBack, IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import { marcasPollos, proveedores } from "../../../../data/data";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  resetNegocioPosicion,
  setNegocioPosicion,
} from "../../../redux/mapSlice";
import { useSelector } from "react-redux";
import SelectMultipleFormik from "../../form/SelectMultipleFormik";
import { FaCheck } from "react-icons/fa";
import { Modal } from "../../modal/Modal";
import MobileMap from "../../map/MobileMap";
import { useState } from "react";

const SignupSchema = Yup.object().shape({
  nombreNegocio: Yup.string().required("Requerido"),
  direccion: Yup.string().required("Requerido"),
  categoria: Yup.string().required("Selecciona una categoría"),
  potencial: Yup.string().required("Selecciona el potencial del negocio"),
});

export const EditarNegocio = ({ negocio }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openMap, setOpenMap] = useState(false);

  const [updateNegocio, { isLoading: isUpdating, isError }] =
    usePutNegocioMutation();
  useEffect(() => {
    dispatch(setNegocioPosicion({ lat: negocio.lat, lng: negocio.lng }));
  }, []);

  const { lat, lng } = useSelector((state) => state.map);

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
    productosQueCompra: negocio?.productosQueCompra || [],
    productosQueLeInteresan:
      negocio?.productosQueLeInteresan || [],
    distribuidorActual: negocio?.distribuidorActual || [],
  };

  const handleSubmit = async (values) => {
    try {
      const data = {
        id: negocio._id,
        ...values,
        potencial: Number(values.potencial),
        lat,
        lng,
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
      dispatch(resetNegocioPosicion());
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
              {/* Ubicación */}
              <div className={style.input__container}>
                <label>Ubicación en el mapa</label>
                <div className={style.mapBtn_container}>
                  <button
                    type="button"
                    className={lat && lng ? style.mapBtnCheck : style.mapBtn}
                    onClick={() => setOpenMap(true)}
                  >
                    {lat && lng
                      ? "Ubicación seleccionada"
                      : "Seleccionar ubicación en el mapa"}
                  </button>
                  {lat && (
                    <FaCheck color="green" size={25} className={style.icon} />
                  )}
                  {!lat && (
                    <IoClose color="red" size={30} className={style.icon} />
                  )}
                </div>
              </div>

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

              <div className={style.input__container}>
                <label htmlFor="productosQueCompra">Productos que compra</label>
                <SelectMultipleFormik
                  name="productosQueCompra"
                  options={marcasPollos}
                  placeholder="Selecciona una o varias categorías..."
                />
              </div>

              <div className={style.input__container}>
                <label htmlFor="productosQueLeInteresan">
                  Productos que le interesan
                </label>
                <SelectMultipleFormik
                  name="productosQueLeInteresan"
                  options={marcasPollos}
                  placeholder="Selecciona una o varias categorías..."
                />
              </div>

              <div className={style.input__container}>
                <label htmlFor="distribuidorActual">Distribuidor actual</label>
                <SelectMultipleFormik
                  name="distribuidorActual"
                  options={proveedores}
                  placeholder="Selecciona una o varias categorías..."
                />
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
      {openMap && (
        <Modal onClose={() => setOpenMap(false)}>
          <MobileMap />
        </Modal>
      )}
    </main>
  );
};
