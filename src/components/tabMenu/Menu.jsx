import "./menu.css";
import { BiHome } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BsBoxSeam, BsFillGeoAltFill } from "react-icons/bs";
import { GiHistogram } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Menu = () => {
  const { pathname } = useLocation();
  const splitPath = pathname.split("/");

  const [width, setWidth] = useState(null);

  useEffect(() => {
    setWidth(window.screen.width);
  }, []);
  useEffect(() => {
    const ancho = (width - 20) / 5;
    const medida1 = (ancho - 70) / 2;
    const medida2 = ancho + medida1;
    const medida3 = ancho * 2 + medida1;
    const medida4 = ancho * 3 + medida1;
    const medida5 = ancho * 4 + medida1;
    document.documentElement.style.setProperty("--widthMenu1", `${medida1}px`);
    document.documentElement.style.setProperty("--widthMenu2", `${medida2}px`);
    document.documentElement.style.setProperty("--widthMenu3", `${medida3}px`);
    document.documentElement.style.setProperty("--widthMenu4", `${medida4}px`);
    document.documentElement.style.setProperty("--widthMenu5", `${medida5}px`);
  }, [width]);

  const { user } = useSelector((store) => store.authDelivery);

  return (
    <>
      <section className="menu__container">
        <ul className="list__ul">
          <li
            className={
              pathname === "/" || splitPath.includes("home")
                ? "list__li active"
                : "list__li"
            }
          >
            <Link to={"/"}>
              <BiHome />
              <span className="menu__title">Home</span>
            </Link>
          </li>
          <li className={pathname === "/mapa" ? "list__li active" : "list__li"}>
            <Link to={"/mapa"}>
              <BsFillGeoAltFill />
              <span className="menu__title">Mapa</span>
            </Link>
          </li>
          <li
            className={
              pathname === "/historial" ? "list__li active" : "list__li"
            }
          >
            <Link to={"/historial"}>
              <GiHistogram />
              <span className="menu__title">Histor.</span>
            </Link>
          </li>
          <li
            className={
              pathname === "/productos" ? "list__li active" : "list__li"
            }
          >
            <Link to={"/productos"}>
              <BsBoxSeam />
              <span className="menu__title">Produc.</span>
            </Link>
          </li>
          <li
            className={
              pathname === "/user" || splitPath.includes("user")
                ? "list__li active"
                : "list__li"
            }
          >
            <Link to={`/user`}>
              <BiUser />
              <span className="menu__title">Perfil</span>
            </Link>
          </li>
          <div className="indicator"></div>
        </ul>
      </section>
      <div className="white"></div>
    </>
  );
};
