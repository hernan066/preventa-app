import { useParams } from "react-router-dom";
import { useGetNegocioQuery } from "../api/apiNegocio";
import Loading from "../components/loading/Loading";
import { DetalleNegocio } from "../components/negocio/DetalleNegocio/Detalle_negocio";


export const DetalleNegocioPage = () => {
  const { id } = useParams();
    const { data, isLoading, error } = useGetNegocioQuery(id);
  return (
    <>
      {isLoading && <Loading />}
      {error && <p>Error cargando los negocios.</p>}
      {data && (
        <DetalleNegocio data={data.negocio}/>
      )}
    </>
  )
  
  
};
