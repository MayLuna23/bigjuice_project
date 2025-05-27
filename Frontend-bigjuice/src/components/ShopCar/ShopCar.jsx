import React, { useState, useEffect } from "react";
import { BASE_API_URL } from "../../utils/api/bigjuice";
import { useColMoney } from "../../hooks/useColMoney";
import { ConfirmationMessage } from "../ConfirmationMessage/ConfirmationMessage";
import { Spinner } from "../Spinner/Spinner";
import axios from "axios";
import "./ShopCar.css";

export const ShopCar = ({
  dataShopcar,
  cleanShopCar,
  saleSuccesMessage,
  closeMessage,
}) => {
  const [pagaConMoneyFormat, setPagaConMoneyFormat] = useState("");
  const [integerPagaCon, setIntegerPagaCon] = useState(0);
  // const [change, setChange] = useState("");
  const [shopCarMessage, SetShopCarMessage] = useState("");
  const [nequiChecked, setNequiChecked] = useState(false);
  const [rappiChecked, setRappiChecked] = useState(false);
  const [showZeroSale, setShowZeroSale] = useState(false);
  const [showZeroMessage, setShowZeroMessage] = useState(false);
  const [zeroMessage, setZeroMessage] = useState("");
  const [user, setUser] = useState("");
  const [customer, setCustomer] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const token = localStorage.getItem("jwtToken");
  const ubication = localStorage.getItem("ubication");

  // Cambia el formato ingresado en el input "Paga Con" a formato de dinero
  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    let inputValueMoneyFormat = inputValue.replace(/[^0-9]/g, "");
    if (inputValueMoneyFormat.length > 0) {
      inputValueMoneyFormat = useColMoney(Number(inputValueMoneyFormat));
    }
    setPagaConMoneyFormat(inputValueMoneyFormat);
  };

  // Aumenta la cantidad de un producto dependiendo del numero de
  // veces que se encuentre en el Shop Car
  const uniqueObjects = {};
  dataShopcar.forEach((obj) => {
    const key = JSON.stringify(obj);
    if (uniqueObjects[key]) {
      uniqueObjects[key].quantity++;
    } else {
      uniqueObjects[key] = { ...obj, quantity: 1 };
    }
  });

  // Calcula el valor de la venta solo por un producto dependiendo del numero de
  // veces que se encuentre en el Shop Car
  let shopcar = Object.values(uniqueObjects);

  shopcar.forEach((obj) => {
    obj.amount = obj.quantity * obj.sale_price;
  });

  // Lista de productos que seran vendidos
  const products = [];
  shopcar.forEach((product) => {
    const item = {
      name: product.name,
      amount: product.amount,
      category: product.category,
      quantity: product.quantity,
    };
    products.push(item);
  });
  // Calculo del total del Shop Car
  let total = 0;
  shopcar.forEach((product) => {
    total += product.amount;
  });

  const handleNequiChange = () => {
    setNequiChecked(true);
    setRappiChecked(false);
  };

  const handleRappiChange = () => {
    setRappiChecked(true);
    setNequiChecked(false);
  };

  // Cambia el formato del dinero "Paga con" ($ 9.999) a un integer
  const changeMoney = () => {
    let intPagaCon = 0;
    if (pagaConMoneyFormat.length <= 5) {
      intPagaCon = parseInt(pagaConMoneyFormat.replace(/\D/g, ""));
    }

    if (pagaConMoneyFormat.length > 5) {
      intPagaCon = parseInt(pagaConMoneyFormat.replace(/[^\d]/g, ""), 10);
    }
    setIntegerPagaCon(intPagaCon);
  };

  // Se utiliza para enviar la peticion POST
  //! ########################################
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowSpinner(true);
    try {
      if (products.length === 0) {
        SetShopCarMessage("No se puede hacer una venta sin productos");
        throw new Error();
      }

      if (integerPagaCon < total) {
        SetShopCarMessage("Dinero insuficiente");
        throw new Error();
      }

      const response = await axios.post(
        `${BASE_API_URL}/sales/new`,
        {
          amount: total,
          nequi: nequiChecked,
          rappi: rappiChecked,
          products: products,
          ubication: ubication,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowSpinner(false);
      if (response.data.status === 201) {
        const calculatedChangeMoneyFormat = useColMoney(integerPagaCon - total);
        // setChange(calculatedChangeMoneyFormat);
        // Esperar a que se complete la actualización del estado antes de llamar a saleSuccesMessage
        await new Promise((resolve) => setTimeout(resolve, 0));

        saleSuccesMessage(`Devuelta ${calculatedChangeMoneyFormat}`);
        setPagaConMoneyFormat("");
        SetShopCarMessage("");
        setNequiChecked(false);
        setRappiChecked(false);
        cleanShopCar();
      }
    } catch (error) {
      // saleSuccesMessage(error);
      setShowSpinner(false);
      console.error(error);
      const message = error.response.data.message;
      saleSuccesMessage(message);
    }
  };

  const cancelButton = () => {
    setPagaConMoneyFormat("");
    SetShopCarMessage("");
    setNequiChecked(false);
    setRappiChecked(false);
    cleanShopCar();
  };

  const zeroSaleForm = () => {
    setShowZeroSale(true);
  };

  const hiddeZeroSaleForm = () => {
    setShowZeroSale(false);
  };

  const confirmZeroSale = async (event) => {
    event.preventDefault();
    try {
      if (customer === "") {
        setShowZeroMessage(true);
        setZeroMessage("El cliente debe tener un nombre valido");
        return;
      }
      if (customer.trim().length === 0) {
        setShowZeroMessage(true);
        setZeroMessage("El cliente debe tener un nombre valido");
        return;
      }

      const response = await axios.post(
        `${BASE_API_URL}/sales/new`,
        {
          amount: 0,
          nequi: false,
          rappi: false,
          products: products,
          ubication: ubication,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowZeroSale(false);
      saleSuccesMessage(response.data.message);
      if (response.data.status === 201) {
        const sendNotification = await axios.post(
          `${BASE_API_URL}/email/zero-sale`,
          {
            customer: customer,
            ubication: ubication,
            user: user,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCustomer("");
        setPagaConMoneyFormat("");
        SetShopCarMessage("");
        setNequiChecked(false);
        setRappiChecked(false);
        setShowZeroMessage(false);
        setZeroMessage("");
        cleanShopCar();
      }
    } catch (error) {
      setShowZeroSale(false);
      const message = error.response.data.message;
      saleSuccesMessage(message);
    }
  };

  return (
    <div>
      {showZeroSale && (
        <div className="zero-sale-container">
          <div>
            <h2>Advertencia ⚠️</h2>
            <p>
              Crear una venta en $0 generará notificaciones a los
              administradores, ¿Está seguro de hacerlo?
            </p>
            <form>
              <label>Nombre del Cliente</label>
              {showZeroMessage && <p style={{ color: "red" }}>{zeroMessage}</p>}
              <input
                value={customer}
                required
                onChange={(e) => setCustomer(e.target.value)}
              />
              <section className="buttons-container-zero-sale">
                <button onClick={(event) => confirmZeroSale(event)}>
                  Enviar
                </button>
                <button
                  style={{ backgroundColor: "blue" }}
                  onClick={hiddeZeroSaleForm}
                >
                  Cancelar
                </button>
              </section>
            </form>
          </div>
        </div>
      )}
      {showSpinner ? <Spinner /> : ""}
      <form className="main-shopcar-container" onSubmit={handleSubmit}>
        <div className="sale-title">
          <h1>VENTA</h1>
        </div>
        <div className="products-in-shopcar-container">
          <table className="products-in-shopcar">
            <thead>
              <tr>
                <th>PRODUCTO</th>
                <th>Und</th>
                <th>VALOR</th>
              </tr>
            </thead>
            <tbody>
              {shopcar.map((product, index) => (
                <tr key={index}>
                  <td>{product.name.toUpperCase()}</td>
                  <td>{product.quantity}</td>
                  <td>{useColMoney(product.sale_price * product.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="total-sale">
          <h1>TOTAL: {useColMoney(total)}</h1>
        </div>
        <div className="checkbox-container">
          <label htmlFor="nequi">
            Nequi
            <input
              className="platform-checkbox"
              type="checkbox"
              id="nequi"
              value="nequi"
              onChange={() => handleNequiChange()}
              checked={nequiChecked}
            />
          </label>
          <label htmlFor="rappi">
            Rappi
            <input
              className="platform-checkbox"
              type="checkbox"
              id="rappi"
              value="rappi"
              onChange={() => handleRappiChange()}
              checked={rappiChecked}
            />
          </label>
        </div>
        <div className="input-cash-container">
          <p>PAGA CON:</p>
          <input
            value={pagaConMoneyFormat}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="buttons-container">
          <button
            type="submit"
            className="shopcar-button pay-button"
            onClick={() => changeMoney()}
          >
            PAGAR
          </button>
          <button
            className="shopcar-button cancel-pay-button"
            onClick={cancelButton}
          >
            CANCELAR
          </button>
        </div>
        <div className="change-container">
          <h2>{shopCarMessage}</h2>
        </div>
        {products.length === 0 ? null : (
          <p onClick={zeroSaleForm} className="zero-sale">
            Interno
          </p>
        )}
      </form>
    </div>
  );
};
