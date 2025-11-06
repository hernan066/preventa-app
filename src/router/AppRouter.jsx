import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import PersistLogin from "./PersitRouter";
import RequireAuth from "./RequiereAuth";
import { NuevoNegocioPage } from "../pages/NuevoNegocioPage";
import { EditarNegocioPage } from "../pages/EditarNegocioPage";
import { ListaNegocioPage } from "../pages/ListaNegocioPage";
import { DetalleNegocioPage } from "../pages/DetalleNegocioPage";
import { ListProductsPage } from "../pages/ListProductsPage";
import { MapPage } from "../pages/MapPage";
import { HistoryPage } from "../pages/HistoryPage";
import { UserPage } from "../pages/UserPage";
import { ChangePasswordPage } from "../pages/ChangePassword";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/home/negocios/nuevo" element={<NuevoNegocioPage />} />
            <Route
              path="/home/negocios/editar/:id"
              element={<EditarNegocioPage />}
            />
            <Route path="/home/negocios/lista" element={<ListaNegocioPage />} />
            <Route path="/home/negocios/detalle/:id" element={<DetalleNegocioPage />} />
            <Route path="/productos" element={<ListProductsPage />} />
            <Route path="/mapa" element={<MapPage />} />
            <Route path="/historial" element={<HistoryPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/editar/password" element={<ChangePasswordPage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};
