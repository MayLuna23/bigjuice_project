import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavbarPhone } from "./NavbarPhone";
import { TiThMenu } from "react-icons/ti";
import "./Navbar.css";

export const Navbar = () => {
  const jwtToken = localStorage.getItem("jwtToken");
  const isLoggedIn = !!jwtToken; // Convertir a un valor booleano
  const navigate = useNavigate();

  const [selectedLink, setSelectedLink] = useState(null);
  const [showSideMenu, setShowSideMenu] = useState(false);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("ubication");
    localStorage.removeItem("rol");
    navigate("/"); // Redirigir a la página de login
  };

  // Use useEffect to update selectedLink immediately after navigation
  useEffect(() => {
    const currentPath = window.location.pathname;
    setSelectedLink(currentPath);
  }, []);

  return (
    <div className="main-navbar-container">
      <div className="logo-container">
        <img src="/logo.png" alt="logo-big-juice" />
      </div>
      <div onClick={() => setShowSideMenu(true)}>
        <TiThMenu className="open-side-menu" size={"3rem"} />
      </div>
      <div className="links-container">
        <p className={selectedLink === "/vender" ? "selected" : ""}>
          <Link to="/vender" onClick={() => handleLinkClick("/vender")}>
            VENDER
          </Link>
        </p>
        <p className={selectedLink === "/ventas" ? "selected" : ""}>
          <Link to="/ventas" onClick={() => handleLinkClick("/ventas")}>
            VENTAS
          </Link>
        </p>
        <p className={selectedLink === "/produccion" ? "selected" : ""}>
          <Link to="/produccion" onClick={() => handleLinkClick("/produccion")}>
            PRODUCCIÓN
          </Link>
        </p>
        <p className={selectedLink === "/compras" ? "selected" : ""}>
          <Link to="/compras" onClick={() => handleLinkClick("/compras")}>
            COMPRAS
          </Link>
        </p>
        <p className={selectedLink === "/proveedores" ? "selected" : ""}>
          <Link
            to="/proveedores"
            onClick={() => handleLinkClick("/proveedores")}
          >
            PROVEEDORES
          </Link>
        </p>
        <p className={selectedLink === "/inventario" ? "selected" : ""}>
          <Link to="/inventario" onClick={() => handleLinkClick("/inventario")}>
            INVENTARIO
          </Link>
        </p>
        <p className={selectedLink === "/usuarios" ? "selected" : ""}>
          <Link to="/usuarios" onClick={() => handleLinkClick("/usuarios")}>
            USUARIOS
          </Link>
        </p>
        <div className="logout-button-container">
          <p
            className="logout-button"
            onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
          >
            {isLoggedIn ? "Cerrar Sesión" : "Iniciar Sesión"}
          </p>
        </div>
      </div>
      {showSideMenu && (
        <NavbarPhone
          handleLinkClick={handleLinkClick}
          handleLogout={handleLogout}
          setSelectedLink={setSelectedLink}
          selectedLink={selectedLink}
          setShowSideMenu={setShowSideMenu}
        />
      )}
    </div>
  );
};
