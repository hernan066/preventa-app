import { useEffect, useMemo } from "react";
import Select from "react-select";
import { useFormikContext, useField } from "formik";

const SelectMultipleFormik = ({ name, options = [], placeholder }) => {
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(name);

  // 🔹 Asegura que el campo tenga siempre un array
  useEffect(() => {
    if (!Array.isArray(field.value)) {
      setFieldValue(name, []);
    }
  }, [field.value, name, setFieldValue]);

  // 🔹 Filtra los valores seleccionados en base a las opciones
  const selectedValues = useMemo(() => {
    if (!options || options.length === 0) return [];
    return options.filter((opt) => field.value?.includes(opt.value));
  }, [options, field.value]);

  const handleChange = (selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setFieldValue(name, values);
  };

  return (
    <div style={{ width: "100%" }}>
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
