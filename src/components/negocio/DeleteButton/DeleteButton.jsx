import styles from "./css.module.css";
import { IoTrashOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { useDeleteNegocioMutation } from "../../../api/apiNegocio";

export const DeleteButton = ({ id }) => {
  const [deleteNegocio] = useDeleteNegocioMutation();

  const handleDelete = () => {
    Swal.fire({
      title: "Desea borrar este negocio?",
      showCancelButton: true,
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "mi-boton-confirmar",
        cancelButton: "mi-boton-cancelar",
      },
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await deleteNegocio(id);
        Swal.fire("Borrado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Negocio no borrado", "", "info");
      }
    });
  };

  return (
    <button className={styles.btn} onClick={handleDelete}>
      <IoTrashOutline />
    </button>
  );
};
