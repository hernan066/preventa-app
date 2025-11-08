import styles from "./css.module.css";
import { FiEdit } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { mapValuesToLabels } from "../../../utils/mapValuesToLabels";
import { marcasPollos, proveedores } from "../../../../data/data";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { dateToLocalDate } from "../../../utils/dateFormat";

const formatPotencial = (value) => "★".repeat(value);
export const DetalleNegocio = ({ data }) => {
  console.log(data);
  const navigate = useNavigate();

  // Convertimos los valores a labels legibles
  const distribuidorActualLabel = mapValuesToLabels(
    data?.distribuidorActual,
    proveedores
  ).join(", ");

  const productosQueCompraLabels = mapValuesToLabels(
    data?.productosQueCompra,
    marcasPollos
  ).join(", ");

  const productosQueLeInteresanLabels = mapValuesToLabels(
    data?.productosQueLeInteresan,
    marcasPollos
  ).join(", ");

  return (
    <div className={styles.container}>
      <button className={styles.back_button} onClick={() => navigate(-1)}>
        <IoArrowBack />
      </button>
      <div className={styles.titleWrapper}>
        <h2>Detalle</h2>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.mobileCards}>
          <div className={styles.card}>
            <div className={styles.btn_container}>
              <button
                className={styles.btn}
                onClick={() => navigate(`/home/negocios/editar/${data._id}`)}
              >
                <FiEdit />
              </button>
              <DeleteButton id={data._id} />
            </div>

            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Negocio:</span>
              <span className={styles.cardValue}>{data.nombreNegocio}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Dueño:</span>
              <span className={styles.cardValue}>
                {data?.nombreDueño || ""}
              </span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Direccion:</span>
              <span className={styles.cardValue}>{data.direccion}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Telefono:</span>
              <a
                href={`https://wa.me/${data.telefono}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#25D366",
                  textDecoration: "underline",
                  fontWeight: "500",
                }}
              >
                {data.telefono}
              </a>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Categoria:</span>
              <span className={styles.cardValue}>{data.categoria}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Horario Apertura:</span>
              <span className={styles.cardValue}>
                {data.horarioApertura + "hs"}
              </span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Horario Cierre:</span>
              <span className={styles.cardValue}>
                {data.horarioCierre + "hs"}
              </span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Potencial:</span>
              <span className={styles.cardValue}>
                {formatPotencial(data.potencial)}
              </span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Cargado:</span>
              <span className={styles.cardValue}>
                {dateToLocalDate(data.createdAt)}
              </span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Modificado:</span>
              <span className={styles.cardValue}>
                {dateToLocalDate(data.updatedAt)}
              </span>
            </div>

            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Fue Visitado?:</span>
              <span className={styles.cardValue}>
                {data.fueVisitado ? "Si" : "No"}
              </span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Es Cliente?:</span>
              <span className={styles.cardValue}>
                {data.esCliente ? "Si" : "No"}
              </span>
            </div>
            <h4 style={{ textAlign: "center" }}>Informacion Adicional</h4>
            <div className={styles.cardTextAreaRow}>
              <p className={styles.cardLabelCenter}>Distribuidor Actual:</p>
              <p className={styles.cardTextAreaValue}>
                {distribuidorActualLabel || "—"}
              </p>
            </div>
            <div className={styles.cardTextAreaRow}>
              <p className={styles.cardLabelCenter}>Productos Que Compra:</p>
              <p className={styles.cardTextAreaValue}>
                {productosQueCompraLabels || "—"}
              </p>
            </div>
            <div className={styles.cardTextAreaRow}>
              <p className={styles.cardLabelCenter}>
                Productos Que Le Interesan:
              </p>
              <p className={styles.cardTextAreaValue}>
                {productosQueLeInteresanLabels || "—"}
              </p>
            </div>
            <h4 style={{ textAlign: "center" }}>Ubicación</h4>
            <MapContainer
              center={[data.lat, data.lng]}
              zoom={15}
              style={{ height: "70dvh", width: "100%" }}
            >
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />

                <Marker position={[data.lat, data.lng]} />
              </>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
