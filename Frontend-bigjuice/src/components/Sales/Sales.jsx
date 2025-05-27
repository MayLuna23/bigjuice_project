import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { useColMoney } from "../../hooks/useColMoney";
import axios from "axios";
import { BASE_API_URL } from "../../utils/api/bigjuice";
import { FaCircleRight, FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { ConfirmationMessage } from "../ConfirmationMessage/ConfirmationMessage";
import { CuadreCaja } from "./CuadreCaja/CuadreCaja";
import { useCurrentDate } from "../../hooks/useCurrentDate";
import { ProductSales } from "./ProductSales/ProductSales";
import { RiNumbersFill } from "react-icons/ri";
import { Spinner } from "../Spinner/Spinner";
import { FaWpforms } from "react-icons/fa";
import "./Sales.css";

export function Sales() {
  const [sales, setSales] = useState([]);
  const [salesNequi, setSalesNequi] = useState("$ 0");
  const [salesRappi, setSalesRappi] = useState("$ 0");
  const [total, setTotal] = useState("$ 0");
  const [totalInteger, setTotalInteger] = useState(0);
  const [totalJugos, setTotalJugos] = useState("$ 0");
  const [totalOthers, setTotalOthers] = useState("$ 0");
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const [ubication, setUbication] = useState("");
  const userUbication = localStorage.getItem("ubication");
  const jwtToken = localStorage.getItem("jwtToken");
  const rol = localStorage.getItem("rol");
  const [showSalesTable, setShowSalesTable] = useState("false");
  const [showUbicationSelector, setShowUbicationSelector] = useState("false");
  const [showSalesMessage, setShowSalesMessage] = useState("false");
  const [salesMessage, setSalesMessage] = useState("");
  const [showDeleteSale, setShowDeleteSale] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [saleId, setSaleId] = useState("");
  const [saleInformation, setSaleInformation] = useState({});
  const [showCuadreCaja, setShowCuadreCaja] = useState(false);
  const [numberNequiSold, setNumberNequiSold] = useState([]);
  const [numberRappiSold, setNumberRappiSold] = useState([]);
  const [positionSalesDate, setPositionSalesDate] = useState("");
  const [totalNumberJugosSold, setTotalNumberJugosSold] = useState(99999);
  const [salesEachProduct, setSalesEachProduct] = useState([]);
  const [showAsideSalesButton, setShowAsideSalesButton] = useState(false);
  const [showAsideSales, setShowAsideSales] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [soldProducts, setSoldProducts] = useState(null);

  // Consumos internos
  const [zeroSales, setZeroSales] = useState([]);

  useEffect(() => {
    rol !== "admin" ? setShowUbicationSelector("false") : setShowUbicationSelector("");

    rol !== "admin" ? setShowDeleteSale(false) : setShowDeleteSale(true);
    setUbication(userUbication);
    const currentDate = useCurrentDate();
    setSdate(currentDate);
    setEdate(currentDate);
  }, []);

  const handleSubmit = async () => {
    if (!sdate || !edate) {
      setShowSalesMessage("");
      setSalesMessage("Por favor, selecciona ambas fechas.");
      return;
    }
    if (sdate > edate) {
      setShowSalesMessage(true);
      setSalesMessage("La fecha de inicio no puede ser mayor que la fecha de fin.");
      return;
    }
    try {
      setShowSpinner(true); // Mostramos spinner de carga
      const dataTotal = await axios.post(
        `${BASE_API_URL}/sales/total`,
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

      const dataTotalJugos = await axios.post(
        `${BASE_API_URL}/sales/category`,
        {
          initialDate: sdate,
          finalDate: edate,
          category: "jugos",
          ubication: ubication || userUbication,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const dataTotalOthers = await axios.post(
        `${BASE_API_URL}/sales/category`,
        {
          initialDate: sdate,
          finalDate: edate,
          category: "otros",
          ubication: ubication || userUbication,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const salesProductsData = await axios.post(
        `${BASE_API_URL}/sales/products`,
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

      let dataNumberRappiJugosSold = 0;
      let dataNumberNequiJugosSold = 0;
      let dataNumberZeroSaleJugosSold = 0;
      const salesList = dataTotal.data.data.sales;
      salesList.forEach((s) => {
        if (s.nequi === true) {
          s.products.forEach((p) => {
            if (p.category === "jugos") dataNumberNequiJugosSold += p.quantity;
          });
        }
        if (s.rappi === true) {
          s.products.forEach((p) => {
            if (p.category === "jugos") dataNumberRappiJugosSold += p.quantity;
          });
        }
        if (s.amount === 0) {
          s.products.forEach((p) => {
            if (p.category === "jugos") {
              dataNumberZeroSaleJugosSold += p.quantity;
            }
          });
        }
      });
      setPositionSalesDate("position-left-sales-date");
      setNumberNequiSold(dataNumberNequiJugosSold);
      setNumberRappiSold(dataNumberRappiJugosSold);
      setZeroSales(dataNumberZeroSaleJugosSold);
      setShowCuadreCaja(true);
      setSales(salesList);
      setTotal(useColMoney(dataTotal.data.data.totalSales));
      setTotalInteger(dataTotal.data.data.totalSales);
      setTotalJugos(useColMoney(dataTotalJugos.data.data));
      setTotalNumberJugosSold(dataTotalJugos.data.data / 6000);
      setTotalOthers(useColMoney(dataTotalOthers.data.data));
      setShowSalesTable("");
      setShowSalesMessage("false");
      setSalesEachProduct(salesProductsData);
      setShowSpinner(false); // ocultamos spinner de carga
      if (showAsideSales === true && showAsideSalesButton === false) {
      } else {
        setShowAsideSalesButton(true);
      }
    } catch (error) {
      setShowSpinner(false); // ocultamos spinner de carga
      setShowSalesTable(false);
      setShowSalesMessage(true);
      setSalesMessage(error.response.data.message || error.response.data || error);
      console.error(error);
    }
  };

  useEffect(() => {
    classifySales(sales);
  }, [sales]);

  const classifySales = (data) => {
    let nequiSales = 0;
    let rappiSales = 0;

    data.forEach((s) => {
      if (s.nequi === true) {
        nequiSales += s.amount;
      }
      if (s.rappi === true) {
        rappiSales += s.amount;
      }
    });
    const nequiSalesMoneyFormat = useColMoney(nequiSales);
    const rappiSalesMoneyFormat = useColMoney(rappiSales);
    setSalesNequi(nequiSalesMoneyFormat);
    setSalesRappi(rappiSalesMoneyFormat);
  };

  const deleteSale = async (saleId) => {
    try {
      const restoreProducts = await axios.post(
        `${BASE_API_URL}/products/restore-product`,
        {
          ...saleInformation,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (restoreProducts.status === 200) {
        const deleteRequest = await axios.delete(`${BASE_API_URL}/sales/remove/${saleId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (deleteRequest.status === 200) {
          setShowDeleteMessage(false);
          setSaleId("");
          handleSubmit(); // Actualizamos la tabla
        }

        if (restoreProducts.status !== 200 && deleteRequest !== 200) {
          throw Error;
        }
      }
    } catch (error) {
      setSalesMessage(error.response.data.message || error.response.data);
    }
  };

  const openConfirmationDeleteSale = (data) => {
    setSaleId(data.id);
    setSaleInformation(data);
    setShowDeleteMessage(true);
  };

  const closeConfirmationDeleteSale = () => {
    setShowDeleteMessage(false);
  };

  const openAsideSales = () => {
    setShowAsideSales(true);
    setShowAsideSalesButton(false);
  };

  return (
    <div>
      {showSpinner && <Spinner />}
      <Navbar />
      {showDeleteMessage && (
        <ConfirmationMessage height={"220px"}>
          <div className="container-deletesale-message">
            <p className="message-confirm-delete-supplier">
              Esta seguro que desea eliminar la venta con ID <span style={{ color: "red" }}>{saleId}</span>
            </p>
            <div className="buttons-delete-supplier-container">
              <button className="confirm-delete-supplier" onClick={() => deleteSale(saleId)}>
                Confirmar
              </button>
              <button className="confirm-cancel-supplier" onClick={closeConfirmationDeleteSale}>
                Cancelar
              </button>
            </div>
          </div>
        </ConfirmationMessage>
      )}
      {showAsideSalesButton && (
        <RiNumbersFill
          onClick={() => openAsideSales()}
          title="Numero de ventas por cada producto"
          style={{
            position: "absolute",
            zIndex: 9999,
            top: "calc(6rem + 12px)",
            left: "10px",
            color: "var(--lila-oscuro)",
            cursor: "pointer",
          }}
          size={"2rem"}
        />
      )}

      {showAsideSales && (
        <ProductSales
          sdate={sdate}
          edate={edate}
          salesEachProduct={salesEachProduct}
          setShowAsideSalesButton={setShowAsideSalesButton}
          setShowAsideSales={setShowAsideSales}
        />
      )}

      {soldProducts && (
        <ConfirmationMessage height={"320px"}>
          <div className="container-deletesale-message">
            <p
              onClick={() => setSoldProducts(null)}
              title={"Cerrar"}
              style={{ right: "4px", position: "absolute", top: "0", color: "red", cursor: "pointer" }}
            >
              X
            </p>
            <p className="message-confirm-delete-supplier">
              Estos son los productos vendidos en la venta con Id:{" "}
              <span style={{ color: "green" }}>{soldProducts.id}</span>
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                overflowY: "auto",
                maxHeight: "200px",
              }}
            >
              <table style={{ minWidth: "150px" }} className="sales-table">
                <thead style={{ position: "sticky", top: "0" }}>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {soldProducts.products.map((prod) => (
                    <tr key={prod.id}>
                      <td>{prod.name}</td>
                      <td>{prod.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ConfirmationMessage>
      )}

      <div className="sales-dates-container">
        <div className="container-form-sales-dates">
          <form className={`form-sales-dates ${positionSalesDate}`}>
            {/* <form className={`form-sales-dates position-left-sales-date`}> */}
            <div>
              <label>Fecha Inicial</label>
              <input
                className="date-selector-sales"
                value={sdate}
                type="date"
                onChange={(e) => setSdate(e.target.value)}
              ></input>
            </div>
            <div>
              <label>Fecha Final</label>
              <input
                className="date-selector-sales"
                value={edate}
                type="date"
                onChange={(e) => setEdate(e.target.value)}
              ></input>
            </div>
            <div>
              <label className={`display-${showUbicationSelector}`}>Ubicación</label>
              <select
                id="ubication"
                value={ubication}
                onChange={(e) => setUbication(e.target.value)}
                className={`display-${showUbicationSelector} ubication-selector-sales`}
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
              <FaMagnifyingGlass style={{ fontSize: "1.3rem", cursor: "pointer" }} onClick={handleSubmit} />
            </div>
          </form>
          {showCuadreCaja && <CuadreCaja total={totalInteger} salesNequi={salesNequi} salesRappi={salesRappi} />}
        </div>
        {showSalesMessage && <p className="sales-message">{salesMessage}</p>}
        <section className={`totals-sales-table display-${showSalesTable}`}>
          <table className="resume-sales-table">
            <tbody>
              <tr>
                <td>Venta solo Jugos</td>
                <td>{totalJugos}</td>
                <td>{`${totalNumberJugosSold} jugos`}</td>
              </tr>

              <tr>
                <td>Venta por Nequi</td>
                <td>{salesNequi}</td>
                <td>{`${numberNequiSold} jugos`}</td>
              </tr>
              <tr>
                <td>Venta por Rappi</td>
                <td>{salesRappi}</td>
                <td>{`${numberRappiSold} jugos`}</td>
              </tr>
              <tr>
                <td>Venta de Otros</td>
                <td>{totalOthers}</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td>Interno</td>
                <td>N/A</td>
                <td>{zeroSales}</td>
              </tr>
              <tr style={{ backgroundColor: "rgba(159, 241, 177, 0.603)" }}>
                <td>Venta Total</td>
                <td>{total}</td>
                <td>N/A</td>
              </tr>
            </tbody>
          </table>
        </section>

        <main className={`sales-table-container display-${showSalesTable}`}>
          <div className="table-responsive">
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Id Venta</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Rappi</th>
                  <th>Nequi</th>
                  <th>Usuario</th>
                  <th>Productos</th>
                </tr>
              </thead>
              <tbody>
                {sales.length === 0 ? (
                  <tr>
                    <td className="no-match" colSpan="11">
                      No hay ventas reportadas en las fechas establecidas
                    </td>
                  </tr>
                ) : (
                  sales.map((sale) => (
                    <tr key={sale.id}>
                      <td>
                        <div className="td-delete-container">
                          {showDeleteSale && (
                            <FaRegTrashAlt
                              style={{ position: "absolute", left: "5px" }}
                              className="delete-sale-button"
                              onClick={() => openConfirmationDeleteSale(sale)}
                            />
                          )}
                          {sale.id}
                        </div>
                      </td>
                      <td>{sale.date}</td>
                      <td>{useColMoney(sale.amount)}</td>
                      <td>{sale.rappi === true ? "Si" : "No"}</td>
                      <td>{sale.nequi === true ? "Si" : "No"}</td>
                      <td>{sale.user}</td>
                      <td >
                        <FaWpforms style={{cursor: "pointer"}} onClick={() => setSoldProducts(sale)} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
