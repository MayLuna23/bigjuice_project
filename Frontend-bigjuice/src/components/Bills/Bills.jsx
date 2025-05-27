import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { useColMoney } from "../../hooks/useColMoney";
import axios from "axios";
import {
  BASE_API_URL,
  getProducts,
  getInventory,
} from "../../utils/api/bigjuice";
import { NewBill } from "./NewBill/NewBill";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ConfirmationMessage } from "../ConfirmationMessage/ConfirmationMessage";
import { useCurrentDate } from "../../hooks/useCurrentDate";
import { IoMdAddCircleOutline } from "react-icons/io";
import "./Bills.css";

export function Bills() {
  const [sdate, setSdate] = useState("");
  const [bills, setBills] = useState([]);
  const [edate, setEdate] = useState("");
  const [total, setTotal] = useState("");
  const [ubication, setUbication] = useState("");
  const [showBillsMessage, setShowBillsMessage] = useState("false");
  const [showBillsTotals, setShowBillsTotals] = useState("false");
  const [showBillsTable, setShowBillsTable] = useState("false");
  const [billsMessage, setbillsMessage] = useState("");
  const [createBill, setCreateBill] = useState(false);
  const [products, setProducts] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsAndProducts, setIngredientsAndProducts] = useState([]);
  const [showDeleteBill, setShowDeleteBill] = useState(true);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [billName, setBillName] = useState("");
  const [billId, setBillId] = useState("");
  const [billData, setBillData] = useState({});

  const userUbication = localStorage.getItem("ubication");
  const jwtToken = localStorage.getItem("jwtToken");
  const rol = localStorage.getItem("rol");

  const getData = async () => {
    const ingredientsList = await getInventory(jwtToken);
    const productsList = await getProducts(jwtToken);
    const ingredientsUbication = ingredientsList.filter(
      (ingredient) => ingredient.ubication === userUbication
    );
    const productsUbication = productsList.filter(
      (product) => product.ubication === userUbication
    );
    const data = [...ingredientsUbication, ...productsUbication];
    setIngredients(ingredientsUbication);
    setProducts(productsUbication);
    setIngredientsAndProducts(data);
  };

  useEffect(() => {
    if (rol !== "admin") {
      setShowDeleteBill(false);
      setbillsMessage("No estas autorizado.");
      setShowBillsMessage(true);
    }
    setUbication(userUbication);
    getData();

    const currentDate = useCurrentDate();
    setSdate(currentDate);
    setEdate(currentDate);
  }, []);

  useEffect(() => {
    setBills(bills);
  }, [bills]);

  const handleSubmit = async () => {
    if (rol !== "admin") {
      setbillsMessage("No estas autorizado.");
      setShowBillsMessage(true);
      return;
    }

    try {
      const dataBills = await axios.post(
        `${BASE_API_URL}/bills`,
        {
          initialDate: sdate,
          finalDate: edate,
          ubication: ubication || userUbication,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const totalAmount = await axios.post(
        `${BASE_API_URL}/bills/total`,
        {
          initialDate: sdate,
          finalDate: edate,
          ubication: ubication || userUbication,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      setBills(dataBills.data);
      setTotal(useColMoney(totalAmount.data.data));
      setShowBillsTotals("");
      setShowBillsTable("");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBill = async () => {
    try {
      const deleteBillElements = await axios.post(
        `${BASE_API_URL}/bills/restore-bill`,
        {
          ...billData,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (deleteBillElements.status === 200) {
        const deleteRequest = await axios.delete(
          `${BASE_API_URL}/bills/remove/${billId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (deleteRequest.status === 200) {
          setShowDeleteMessage(false);
          setBillId("");
          setBillName("");
          handleSubmit();
        }

        if (deleteRequest.status !== 200 || deleteBillElements.status !== 200) {
          throw Error;
        }
      }
    } catch (error) {
      console.error(error);
      setbillsMessage(error.response.data.message || error.response.data);
    }
  };

  const showNewBillForm = () => {
    setCreateBill(true);
  };
  const closeNewBillForm = () => {
    setCreateBill(false);
  };

  const openConfirmationDeleteBill = (bill) => {
    setBillData(bill);
    setBillId(bill.id);
    setShowDeleteMessage(true);
    setBillName(bill.name);
    setbillsMessage("");
  };

  return (
    <>
      <Navbar />
      {createBill && (
        <NewBill
          ubication={ubication}
          jwtToken={jwtToken}
          closeNewBillForm={closeNewBillForm}
          products={products}
          ingredients={ingredients}
          ingredientsAndProducts={ingredientsAndProducts}
          refreshTable={handleSubmit}
        />
      )}
      {showDeleteMessage && (
        <ConfirmationMessage>
          <div className="container-deletesale-message">
            <p className="message-confirm-delete-supplier">
              Esta seguro que desea eliminar la compra{" "}
              <span style={{ color: "red" }}>{billName.toUpperCase()}</span>
            </p>
            {showBillsMessage && (
              <p className="error-message">{billsMessage}</p>
            )}
            <div className="buttons-delete-supplier-container">
              <button className="confirm-delete-supplier" onClick={deleteBill}>
                Confirmar
              </button>
              <button
                className="confirm-cancel-supplier"
                onClick={() => setShowDeleteMessage(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </ConfirmationMessage>
      )}
      <div className="container-form-sales-dates">
        <form className="form-sales-dates">
          <button
            title="Crear Compra / Gasto"
            onClick={showNewBillForm}
            type="button"
            className="new-bill"
          >
            <IoMdAddCircleOutline size={"3rem"} />
          </button>
          <div>
            <label>Fecha Inicial</label>
            <input
              className="date-selector-bills"
              value={sdate}
              type="date"
              onChange={(e) => setSdate(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Fecha Final</label>
            <input
              className="date-selector-bills"
              value={edate}
              type="date"
              onChange={(e) => setEdate(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Ubicación</label>
            <select
              id="ubication"
              value={ubication}
              onChange={(e) => setUbication(e.target.value)}
              className={`ubication-selector-sales`}
            >
              <option value="" disabled>
                Selecciona...
              </option>
              <option value="villa colombia">Villa Colombia</option>
              <option value="unico">Único</option>
            </select>
          </div>
          <div className="button-bills-find">
            <p>Buscar</p>
            <FaMagnifyingGlass
              style={{ fontSize: "1.3rem", cursor: "pointer" }}
              onClick={handleSubmit}
            />
          </div>
        </form>
        {showBillsMessage && <p className="error-message">{billsMessage}</p>}
      </div>

      <section className={`totals-bills-messages display-${showBillsTotals}`}>
        <table>
          <tbody>
            <tr>
              <td>Total</td>
              <td>{total}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <main className={`bills-table-container display-${showBillsTable}`}>
        <table className="bills-table">
          <thead>
            <tr>
              <th>Gasto</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Usuario</th>
              <th>Ubicación</th>
              <th>Elementos</th>
            </tr>
          </thead>
          <tbody>
            {bills &&
              bills.map((bill) => (
                <tr key={bill.id}>
                  <td>
                    <div className="td-delete-container">
                      {showDeleteBill && (
                        <FaRegTrashAlt
                          onClick={() => openConfirmationDeleteBill(bill)}
                          style={{ position: "absolute", left: "5px" }}
                        />
                      )}
                      {bill.name}
                    </div>
                  </td>
                  <td>{useColMoney(bill.amount)}</td>
                  <td>{bill.date}</td>
                  <td>{bill.user}</td>
                  <td>{bill.ubication}</td>
                  <td>
                    <ul>
                      {bill.elements && bill.elements.length > 0 ? (
                        bill.elements.map((element, index) => (
                          <li key={index}>
                            {element.name.toUpperCase().replace("_", " ")} -{" "}
                            {element.unityMesure === "kg"
                              ? element.quantity / 1000
                              : element.quantity}{" "}
                            {element.unityMesure}
                          </li>
                        ))
                      ) : (
                        <span>No hay elementos</span>
                      )}
                    </ul>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
