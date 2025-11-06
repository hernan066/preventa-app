import styles from "./css.module.css";
import { useState, useMemo } from "react";
import { FiEdit } from "react-icons/fi";
import { IoArrowBack, IoEyeOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const formatPotencial = (value) => "★".repeat(value);
export const DetalleNegocio = ({ data }) => {
  console.log(data);
  const navigate = useNavigate();

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
                onClick={() => navigate(`/home/negocios/editar/${row._id}`)}
              >
                <FiEdit />
              </button>
              <button className={styles.btn}>
                <IoTrashOutline />
              </button>
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
              <span className={styles.cardValue}>{data.telefono}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Categoria:</span>
              <span className={styles.cardValue}>{data.categoria}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Horario Apertura:</span>
              <span className={styles.cardValue}>{data.horarioApertura + 'hs'}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Horario Cierre:</span>
              <span className={styles.cardValue}>{data.horarioCierre + 'hs'}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Potencial:</span>
              <span className={styles.cardValue}>{formatPotencial(data.potencial)}</span>
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
            <h4 style={{textAlign: 'center'}}>Informacion Adicional</h4>
             <div className={styles.cardRow}>
              <span className={styles.cardLabel}>Distribuidor Actual:</span>
              <span className={styles.cardValue}>
                {data?.informacionAdicional.distribuidorActual || ""}
              </span>
               </div>
            <div className={styles.cardTextAreaRow}>
              <p className={styles.cardLabelCenter}>
                Productos Que Compra:
              </p>
              <p className={styles.cardTextAreaValue}>
                {data?.informacionAdicional.productosQueCompra || ""}
              </p>
            </div>
            <div className={styles.cardTextAreaRow}>
              <p className={styles.cardLabelCenter}>
                Productos Que Le Interesan:
              </p>
              <p className={styles.cardTextAreaValue}>
                {data?.informacionAdicional.productosQueLeInteresan || ""}
              </p>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};
