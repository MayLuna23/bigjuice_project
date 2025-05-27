import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./NavbarPhone.css";

export function NavbarPhone({
  handleLinkClick,
  setSelectedLink,
  selectedLink,
  setShowSideMenu,
}) {
  useEffect(() => {
    const currentPath = window.location.pathname;
    setSelectedLink(currentPath);
  }, []);

  return (
    <div className="slide-menu-phone">
      <div className="logo-container-phone">
        <p
          onClick={() => setShowSideMenu(false)}
          className="close-side-menu-phone"
        >
          X
        </p>
        <img src="/logo.png" alt="logo-big-juice" />
      </div>
      <div className="links-container-phone">
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
      </div>
    </div>
  );
}
