export const formatCop = (value) => {
  const finalValue = typeof value === 'string' ? unFormatPrice(value) : value
  const format = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "cop",
    maximumFractionDigits: 0,
  });
  return format.format(finalValue);
};

export const unFormatPrice = (str) => {
  return str.replace(/[^\d,]/g, "").replace(",", ".");
};