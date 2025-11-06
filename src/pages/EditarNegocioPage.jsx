import { useParams } from "react-router-dom";
import { useGetNegocioQuery } from "../api/apiNegocio";
import Loading from "../components/loading/Loading";
import { EditarNegocio } from "../components/negocio/editarNegocio/Editar_negocio";

export const EditarNegocioPage = () => {
  const { id } = useParams();
    const { data, isLoading, error } = useGetNegocioQuery(id);
  return (
    <>
      {isLoading && <Loading />}
      {error && <p>Error cargando los negocios.</p>}
      {data && (
        <EditarNegocio negocio={data.negocio}/>
      )}
    </>
  )
  
  
};
