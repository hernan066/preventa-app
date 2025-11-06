import { useNavigate } from "react-router-dom";
import style from "./user.module.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/authSlice";
import { useLogoutMutation } from "../../api/apiAuth";

export const User = ({ data }) => {
  console.log(data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, { isLoading, isError }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logOut());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <main className={style.container}>
      <img
        src="https://ik.imagekit.io/mrprwema7/OurMarket/logo_ZbFW9zKm6.png?updatedAt=1761139121065"
        alt="logo"
        className={style.logo__img}
      />
      <div className={style.welcome_text}>
        <h2>Opciones de usuario</h2>
        <p>Selecciona una de las opciones</p>
      </div>
      <div className={style.btn_container}>
        <div className="div">
          <p>Nombre:</p>
          <h3>{data.name + " " + data.lastName}</h3>
        </div>
        <div className="div">
          <p>Email:</p>
          <h3>{data.email}</h3>
        </div>
        <button
          className={style.btn}
          onClick={() => navigate("/user/editar/password")}
        >
          Cambiar Contraseña
        </button>
        <button className={style.btn} onClick={() => handleLogout()}>
          Cerrar sesión
        </button>
      </div>
    </main>
  );
};
