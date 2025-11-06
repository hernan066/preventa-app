import { useNavigate } from "react-router-dom";
import style from "./main.module.css";

export const Main = () => {
  const navigate = useNavigate();
  return (
    <main className={style.container}>
      <img
        src="https://ik.imagekit.io/mrprwema7/OurMarket/logo_ZbFW9zKm6.png?updatedAt=1761139121065"
        alt="logo"
        className={style.logo__img}
      />
      <div className={style.welcome_text}>
        <h2>Bienvenido a la app de preventa</h2>
        <p>Selecciona una de las opciones para comenzar</p>
      </div>
      <div className={style.btn_container}>

     <button className={style.btn} onClick={()=>navigate('/home/negocios/nuevo')}>Nuevo negocio</button>
     <button className={style.btn} onClick={()=>navigate('/home/negocios/lista')}>Lista negocios</button>
     <button className={style.btn}>Negocios para visitar hoy</button>
      </div>
    </main>
  );
};
