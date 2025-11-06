import styles from "./error.module.css";

export const Error = () => {
  return (
    <div className={styles.error__container}>
      <div className={styles.error__box}>⚠ Ha ocurrido un error</div>
    </div>
  );
};
