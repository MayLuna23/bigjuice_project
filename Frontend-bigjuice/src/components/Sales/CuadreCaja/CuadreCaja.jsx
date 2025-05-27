import { useEffect, useState } from "react";
import { useColMoney } from "../../../hooks/useColMoney";
import React from "react";
import "./CuadreCaja.css";

export function CuadreCaja({ total, salesNequi, salesRappi, isMobile }) {
  const [initialMoneyBox, setInitialMoneyBox] = useState("");
  const [showTotal, setShowTotal] = useState(false);
  const [totalMoney, setTotalMoney] = useState("");
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");
  // total = parseInt(total.replace("$", "").replace(".", ""));
  salesNequi = parseInt(salesNequi.replace("$", "").replace(".", ""));
  salesRappi = parseInt(salesRappi.replace("$", "").replace(".", ""));

  const calculateTotal = () => {
    if (!initialMoneyBox) {
      setShowError(true);
      setMessage("Ingrese el dinero inicial de la caja");
      return;
    }
    setShowError(false);
    setMessage("");
    const result = parseInt(initialMoneyBox) + total - salesNequi - salesRappi;
    setTotalMoney(result);
    setShowTotal(true);
  };

  return (
    <div className="cuadre-container">
      <h3>Cuadre Caja</h3>
      <label>Caja Inicial:</label>
      <input
        value={initialMoneyBox}
        onChange={(e) => setInitialMoneyBox(e.target.value)}
        type="number"
      />
      <button onClick={calculateTotal}>Calcular</button>
      {showError && <p className="error-message">{message}</p>}
      {showTotal && (
        <>
          <p className="total-moneybox">
            Dinero en efectivo que debe haber en la caja:{" "}
          </p>
          <span>{useColMoney(totalMoney)}</span>
        </>
      )}
    </div>
  );
}
