

export const useCurrentDate = () => {
  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1;
  const ano = fechaActual.getFullYear();
  const currentDate = `${ano}-${mes < 10 ? "0" + mes : mes}-${
    dia < 10 ? "0" + dia : dia
  }`;

  return currentDate;
};
