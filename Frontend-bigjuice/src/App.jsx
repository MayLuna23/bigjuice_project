import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

// Componentes
import { Vender } from "./components/Vender/Vender";
import { Login } from "./components/Login/Login";
import { UbicationSelector } from "./components/UbicationSelector/UbicationSelector";
import { Sales } from "./components/Sales/Sales";
import { Production } from "./components/Production/Production";
import { Bills } from "./components/Bills/Bills";
import { Suppliers } from "./components/Suppliers/Suppliers";
import { Inventory } from "./components/Inventory/Inventory";
import { Users } from "./components/Users/Users";

// Hooks
import { useTabsName } from "./hooks/useTabsName";

import "./App.css";

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken || jwtToken.length < 150) {
      // Redirigir a la página de login si no hay jwtToken
      navigate("/");
    }
  }, [navigate]);

  return element;
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = useTabsName(location.pathname);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <>
      <Helmet>
        <title>{useTabsName(location.pathname)}</title>
      </Helmet>
      <Routes location={location}>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin-ubication"
          element={<PrivateRoute element={<UbicationSelector />} />}
        />
        <Route path="/vender" element={<PrivateRoute element={<Vender />} />} />
        <Route path="/ventas" element={<PrivateRoute element={<Sales />} />} />
        <Route
          path="/produccion"
          element={<PrivateRoute element={<Production />} />}
        />
        <Route path="/compras" element={<PrivateRoute element={<Bills />} />} />
        <Route
          path="/proveedores"
          element={<PrivateRoute element={<Suppliers />} />}
        />
        <Route
          path="/inventario"
          element={<PrivateRoute element={<Inventory />} />}
        />
        <Route
          path="/usuarios"
          element={<PrivateRoute element={<Users />} />}
        />
      </Routes>
    </>
  );
}

export default App;
