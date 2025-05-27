// Retorna el nombre de la pestana segun el Link
export const useTabsName = (pathname) => {
  switch (pathname) {
    case "/login":
      return "Login - Big Juice";
    case "/vender":
      return "Vender";
    case "/ventas":
      return "Reporte de Ventas";
    case "/produccion":
      return "Registrar produccion";
    case "/compras":
      return "Reporte de Compras";
    case "/proveedores":
      return "Proveedores";
    case "/inventario":
      return "Inventario";
    case "/usuarios":
      return "Usuarios";
    default:
      return "Big Juice";
  }
};
