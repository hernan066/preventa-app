import style from "./css.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { usePostNegocioMutation } from "../../../api/apiNegocio";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { useState } from "react";
import { Modal } from "../../modal/Modal";
import MobileMap from "../../map/MobileMap";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { resetNegocioPosicion } from "../../../redux/mapSlice";
import { useEffect } from "react";
import SelectMultipleFormik from "../../form/SelectMultipleFormik";
import {
  categoriasProductos,
  marcasPollos,
  proveedores,
} from "../../../../data/data";
import Swal from "sweetalert2";

const SignupSchema = Yup.object().shape({
  nombreNegocio: Yup.string().required("Requerido"),
  direccion: Yup.string().required("Requerido"),
  categoria: Yup.string().required("Selecciona una categoría"),
  potencial: Yup.string().required("Selecciona el potencial del negocio"),
});

export const NuevoNegocio = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postNegocio, { isLoading, isError }] = usePostNegocioMutation();
  const [openMap, setOpenMap] = useState(false);
  const { lat, lng } = useSelector((state) => state.map);

  useEffect(() => {
    dispatch(resetNegocioPosicion());
  }, []);

  const initialValues = {
    nombreNegocio: "",
    nombreDueño: "",
    direccion: "",
    telefono: "",
    categoria: "",
    horarioApertura: "",
    horarioCierre: "",
    potencial: "",
    fueVisitado: false,
    esCliente: false,
    vendeNuestrasCategorias: false,
    productosQueCompra: [],
    productosQueLeInteresan: [],
    distribuidorActual: [],
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = {
        ...values,
        potencial: Number(values.potencial),
        lat,
        lng,
      };
      await postNegocio(data).unwrap();
      dispatch(resetNegocioPosicion());
      resetForm();
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
        title: "Negocio creado!",
      });
      navigate("/");
    } catch (error) {
      console.error("Error al registrar negocio:", error);
    }
  };

  return (
    <main className={style.container}>
      <button className={style.back_button} onClick={() => navigate(-1)}>
        <IoArrowBack />
      </button>
      <div className={style.welcome_text}>
        <h2>Nuevo Negocio</h2>
      </div>

      <div className={style.btn_container}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {(values) => (
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
                <label>Ya fue visitado?</label>
                <Field type="checkbox" name="fueVisitado" />
              </div>
              <div className={style.checkbox_container}>
                <label>Es cliente?</label>
                <Field type="checkbox" name="esCliente" />
              </div>
              <div className={style.checkbox_container}>
                <label>Vende nuestras categorias?</label>
                <Field type="checkbox" name="vendeNuestrasCategorias" />
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
                  Categorias que le interesan
                </label>
                <SelectMultipleFormik
                  name="productosQueLeInteresan"
                  options={categoriasProductos}
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
                className={`btn-load ${isLoading ? "button--loading" : ""}`}
                type="submit"
                disabled={isLoading || !lat || !lng}
              >
                <span className="button__text">Enviar</span>
              </button>
              {isError && (
                <p className="login__error">
                  Error al cargar el formulario, intenta nuevamente.
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
