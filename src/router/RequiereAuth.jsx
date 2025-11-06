import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from "../components/layout/Layout";

const RequireAuth = ({ children }) => {
  const { token } = useSelector((store) => store.authDelivery);
  const location = useLocation();

  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
