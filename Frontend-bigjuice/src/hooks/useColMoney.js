export const useColMoney = (value) => {
  const copMoney = value.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return copMoney;
};
