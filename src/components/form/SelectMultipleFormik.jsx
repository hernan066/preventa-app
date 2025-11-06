/* import Select from "react-select";
import { useField, useFormikContext } from "formik";

const SelectMultipleFormik = ({ name, options, placeholder }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name );

  const handleChange = (selectedOptions) => {
    // Guarda solo los valores en el formik (array de strings)
    setFieldValue(
      name,
      selectedOptions ? selectedOptions.map((opt) => opt.value) : []
    );
  };

  // Convierte el valor actual de Formik en el formato que react-select entiende
  const currentValue =
    options.filter((opt) => field.value.includes(opt.value)) || [];

  return (
    <div className="w-full">
      <Select
        isMulti
        options={options}
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder || "Seleccionar..."}
        isSearchable
        classNamePrefix="react-select"
      />
      {meta.touched && meta.error && (
        <p className="login__error">{meta.error}</p>
      )}
    </div>
  );
};

export default SelectMultipleFormik; */
import React from "react";
import Select from "react-select";
import { useFormikContext, useField } from "formik";

const SelectMultipleFormik = ({ name, options, placeholder }) => {
  // Estos hooks deben ejecutarse DENTRO de un <Formik>
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  

  const handleChange = (selectedOptions) => {
    setFieldValue(
      name,
      selectedOptions ? selectedOptions.map((opt) => opt.value) : []
    );
  };

  // Para mostrar valores seleccionados correctamente en react-select
  const selectedValues = options.filter((opt) =>
    field.value?.includes(opt.value)
  );

  return (
    <div style={{ width: '100%'}}>
      <Select
        isMulti
        options={options}
        value={selectedValues}
        onChange={handleChange}
        placeholder={placeholder}
        isSearchable
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
          
            borderRadius: "0.75rem",
            borderColor: "#ccc",
            padding: "2px 4px",
            boxShadow: "none",
            "&:hover": { borderColor: "#888" },
          }),
        }}
      />
      {meta.touched && meta.error && (
        <div style={{ color: "red", fontSize: "0.9rem" }}>{meta.error}</div>
      )}
    </div>
  );
};

export default SelectMultipleFormik;

