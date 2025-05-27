import { useEffect, useState } from "react";
import { BASE_API_URL } from "../../../utils/api/bigjuice";
import { useGetUserData } from "../../../hooks/useGetUserData";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useCurrentDate } from "../../../hooks/useCurrentDate";
import { FaRegTrashAlt } from "react-icons/fa";
import { ConfirmationMessage } from "../../ConfirmationMessage/ConfirmationMessage";
import axios from "axios";
import "./ProductionHistoric.css";

export function ProductionHistoric({ setShowHistoric }) {
  const [userRol, setUserRol] = useState("");
  const [userUbication, setUserUbication] = useState("");
  const [ubication, setUbication] = useState(); // Se usa para cambiar la ubicacion de la consulta
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const [dataProduction, setDataProduction] = useState([]);
  const jwtToken = localStorage.getItem("jwtToken");
  const { userData, error } = useGetUserData(jwtToken);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [filterQuantity, setFilterQuantity] = useState("");
  const [totalProduction, setTotalProduction] = useState(0);
  const [prodSelected, setProdSelected] = useState({});
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  useEffect(() => {
    if (error) {
      setShowMessage(true);
      setMessage(error.response.data.message);
    } else if (userData) {
      setUserRol(userData.rol);
      setUserUbication(userData.ubication);
      const currentDate = useCurrentDate();
      setSdate(currentDate);
      setEdate(currentDate);
    }
  }, [userData, error]);

  // Funcion para obtener historico de produccion
  const handleSubmit = async () => {
    try {
      const getHistoricProduction = await axios.post(
        `${BASE_API_URL}/production`,
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

      if (getHistoricProduction.status === 200) {
        setShowTable(true);
        setDataProduction(getHistoricProduction.data);
        let totalCounter = 0;
        getHistoricProduction.data.forEach((element) => {
          totalCounter += parseInt(element.quantity);
        });
        setTotalProduction(totalCounter);
      }
    } catch (error) {
      console.error(error);
      setShowMessage(true);
      setMessage(error.response.data.message);
    }
  };

  const handleFilterQuantity = (e) => {
    setFilterQuantity(e.target.value);
  };

  const deleteProduction = async () => {
    try {
      const resp = await axios.post(`${BASE_API_URL}/production/${prodSelected.id}`, prodSelected, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log(resp);
      if (resp.data.status === 200) {
        setShowDeleteMessage(false);
        setProdSelected({});
        handleSubmit();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-container-historic-production">
      {showDeleteMessage && (
        <ConfirmationMessage height={"280px"}>
          <div className="container-deletesale-message">
            <p className="message-confirm-delete-supplier">¿Esta seguro que desea eliminar esta produccion?</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <table className="table-delete-production">
                <tbody>
                  <tr>
                    <td>Producto</td>
                    <td>{prodSelected.product}</td>
                  </tr>
                  <tr>
                    <td>Cantidad</td>
                    <td>{prodSelected.quantity}</td>
                  </tr>
                  <tr>
                    <td>Fecha de prod</td>
                    <td>{prodSelected.date}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="buttons-delete-production-container">
              <button className="confirm-delete-supplier" onClick={() => deleteProduction()}>
                Confirmar
              </button>
              <button
                className="confirm-cancel-supplier"
                onClick={() => {
                  setShowDeleteMessage(false), setProdSelected({});
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </ConfirmationMessage>
      )}
      <main className="submain-container-historic-production">
        <p
          title={"Cerrar"}
          style={{ position: "absolute", right: "5px", cursor: "pointer" }}
          onClick={() => setShowHistoric(false)}
        >
          X
        </p>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          Consultar historico de producción
        </h2>
        <div className="dates-production-container">
          <form className="form-production-dates">
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
                style={{
                  fontSize: "1.3rem",
                  cursor: "pointer",
                }}
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
        <div>
          {showMessage && (
            <div>
              <p className="error-message">{message}</p>
            </div>
          )}
          {showTable && (
            <div className="input-and-total-historic-container">
              <input
                className="filter-historic-production"
                type="number"
                placeholder="Filtrar por cantidad"
                value={filterQuantity}
                onChange={handleFilterQuantity}
              />
              <div className="total-produced">
                <p>
                  Total producidos: <span>{totalProduction}</span>
                </p>
              </div>
            </div>
          )}
          {showTable && (
            <div className="historic-production-table-container">
              <table style={{ fontFamily: "Times New Roman" }} className="production-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad Producida</th>
                    <th>Usuario</th>
                    <th>Fecha</th>
                    <th>Ubicación</th>
                  </tr>
                </thead>
                <tbody>
                  {dataProduction.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", color: "red" }}>
                        No hay elementos
                      </td>
                    </tr>
                  ) : (
                    dataProduction
                      .filter((item) => {
                        // Filtrar los elementos según el valor de filterQuantity
                        return filterQuantity === "" || item.quantity == filterQuantity;
                      })
                      .map((e) => (
                        <tr key={e.id}>
                          <td>{e.product.toUpperCase()}</td>
                          <td>{e.quantity}</td>
                          <td>{e.user}</td>
                          <td>{e.date}</td>
                          <td>{e.ubication}</td>
                          <td>
                            {
                              <FaRegTrashAlt
                                color="red"
                                onClick={() => {
                                  setShowDeleteMessage(true), setProdSelected(e);
                                }}
                              />
                            }
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
