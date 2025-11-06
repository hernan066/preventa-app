import styles from "./Modal.module.css";
import { IoSaveOutline } from "react-icons/io5";



export const Modal = ({ children, onClose }) => {
 
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={styles.saveBtn} onClick={onClose}>
          <IoSaveOutline /> Guardar
        </button>
      </div>
    </div>
  );
};
