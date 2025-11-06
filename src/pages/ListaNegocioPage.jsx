import { useGetNegociosQuery } from "../api/apiNegocio";
import Loading from "../components/loading/Loading";
import DataTable from "../components/negocio/listaNegocio/Lista_negocio";

const formatBoolean = (value) => (value ? "Si" : "No");
const formatPotencial = (value) => "★".repeat(value);
const formatCapitalize = (value) => {
  const firstLetter = value.charAt(0).toUpperCase();
  const restOfWord = value.slice(1).toLowerCase();
  return firstLetter + restOfWord;
};
const formatDireccion = (value) => {
  return value
    .split(" ")
    .map((word) => {
      // Si la palabra contiene números, la dejamos igual
      if (/\d/.test(word)) return word;
      // Si no, capitalizamos la primera letra
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

const columns = [
  {
    key: "nombreNegocio",
    label: "Negocio",
    sortable: true,
    filterable: true,
    format: formatCapitalize,
  },
  {
    key: "direccion",
    label: "Direccion",
    sortable: true,
    filterable: true,
    format: formatDireccion,
  },
  {
    key: "categoria",
    label: "Categoria",
    sortable: true,
    filterable: true,
    format: formatCapitalize,
  },
  {
    key: "esCliente",
    label: "Es Cliente?",
    sortable: true,
    filterable: true,
    format: formatBoolean,
  },
  {
    key: "fueVisitado",
    label: "Fue Visitado?",
    sortable: true,
    filterable: true,
    format: formatBoolean,
  },
  {
    key: "potencial",
    label: "Potencial",
    sortable: true,
    filterable: false,
    format: formatPotencial,
  },
];

export const ListaNegocioPage = () => {
  const { data, isLoading, error } = useGetNegociosQuery();

  return (
    <>
      {isLoading && <Loading />}
      {error && <p>Error cargando los negocios.</p>}
      {data && (
        <DataTable columns={columns} data={data.negocios} rowsPerPage={10} />
      )}
    </>
  );
};
