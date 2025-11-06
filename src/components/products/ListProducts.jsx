import { useSelector } from "react-redux";
import styles from "./listProducts.module.css";
import { formatQuantity } from "../../utils/quantityFormat";

export const ListProducts = () => {
  const { all } = useSelector((store) => store.products);

  return (
    <section className={styles.listProducts__container}>
      <h1>
        Total de productos <br />
        ordenados
      </h1>
      <div className={styles.listProducts__products}>
        {all.map((product) => (
          <div className={styles.listProducts__products__card}>
            <div className={styles.listProducts__products__cardImg}>
              <img src={product.img} alt="" />
            </div>
            <div className={styles.listProducts__products__cardInfo}>
              <h4>{product.name}</h4>
              <span className={styles.listProducts__products__cardQuantity}>
                {formatQuantity(product.totalQuantity)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
