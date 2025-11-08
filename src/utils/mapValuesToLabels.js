/**
 * Convierte un array de values a sus labels correspondientes.
 * @param {string[]} values - Array con los values (por ejemplo ["car_paz", "soychu"])
 * @param {Array<{label: string, value: string}>} lista - Lista de referencia (proveedores o marcasPollos)
 * @returns {string[]} Array con los labels encontrados
 */
export const mapValuesToLabels = (values = [], lista = []) => {
  if (!Array.isArray(values)) return [];
  return values
    .map((val) => lista.find((item) => item.value === val)?.label)
    .filter(Boolean); // elimina los que no encontró
};
