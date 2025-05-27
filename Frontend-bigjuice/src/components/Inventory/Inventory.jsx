import { Navbar } from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import {
  BASE_API_URL,
  getInventory,
  getProducts,
} from "../../utils/api/bigjuice";
import { ConfirmationMessage } from "../ConfirmationMessage/ConfirmationMessage";
import { NewProduct } from "./NewProduct";
import { AdminProduct } from "./AdminProduct";
import axios from "axios";
import "./Inventory.css";

export function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsUbication, setProductsUbication] = useState([]);
  const [totalJugos, setTotalJugos] = useState("");
  const [inventoryUbication, setInventoryUbication] = useState([]);
  const [othersUbication, setOthersUbication] = useState([]);
  const [ubication, setUbication] = useState("");
  const [showTableInventory, setShowTableInventory] = useState(false);
  const [showInventoryMessage, setShowInventoryMessage] = useState(false);
  const [showNewProduct, setShowNewProduct] = useState(false); //!
  const [inventoryMessage, setInventoryMessage] = useState("");
  const [category, setCategory] = useState("");
  const [showJugosForm, setShowJugosForm] = useState(false);
  const [showOtrosForm, setShowOtrosForm] = useState(false);
  const [showEditDeleteButton, setShowEditDeleteButton] = useState(false);
  const [heightForm, setHeightForm] = useState("");
  const [dataElement, setDataElement] = useState({});
  const userUbication = localStorage.getItem("ubication");
  const jwtToken = localStorage.getItem("jwtToken");
  const rol = localStorage.getItem("rol");
  const [productForm, setProductForm] = useState({
    name: "",
    quantity: "",
    sale_price: "",
    category: "",
    ubication: "",
    hielo: "",
    leche: "",
    leche_polvo: "",
    azucar: "",
    pulpa_mora: "",
    pulpa_maracuya: "",
    pulpa_mango: "",
    pulpa_lulo: "",
    pulpa_guanabana: "",
    pulpa_borojo: "",
    saborizante: "",
    canela: "",
    miel: "",
    tarrina: 0,
    pitillo: 0,
  });

  const getData = async () => {
    setUbication(userUbication);
    try {
      if (rol !== "admin") {
        setShowTableInventory(false);
        setShowInventoryMessage(true);
        setInventoryMessage("Inicia Sesión con una cuenta autorizada.");
      } else {
        setShowTableInventory(true);
      }
      const dataInventory = await getInventory(jwtToken);
      const dataProducts = await getProducts(jwtToken);
      setInventory(dataInventory);
      setProducts(dataProducts);

      const dataInventoryFiltered = dataInventory.filter(
        (e) => e.ubication === userUbication && e.category === "ingredient"
      );
      const dataOthersFiltered = dataInventory.filter(
        (e) => e.ubication === userUbication && e.category === "others"
      );
      const dataProductsFiltered = dataProducts.filter(
        (e) => e.ubication === userUbication
      );
      let counterJugos = 0;
      dataProductsFiltered.forEach((e) => {
        if (e.category === "jugos") {
          counterJugos += e.quantity;
        }
      });
      setTotalJugos(counterJugos);
      setInventoryUbication(dataInventoryFiltered);
      setOthersUbication(dataOthersFiltered);
      setProductsUbication(dataProductsFiltered);
    } catch (error) {
      setShowInventoryMessage(true);
      setInventoryMessage(error.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const changeInventoryUbication = (event) => {
    event.preventDefault();
    const selectedUbication = event.target.value;
    setUbication(selectedUbication);

    const filteredProducts = products.filter(
      (e) => e.ubication === selectedUbication
    );
    const filteredInventory = inventory.filter(
      (e) => e.ubication === selectedUbication && e.category === "ingredient"
    );
    const filteredInventoryOthers = inventory.filter(
      (e) => e.ubication === selectedUbication && e.category === "others"
    );

    setInventoryUbication(filteredInventory);
    setOthersUbication(filteredInventoryOthers);
    setProductsUbication(filteredProducts);
  };

  const showForms = (element) => {
    setShowEditDeleteButton(true);
    setDataElement(element);
  };

  const changeShowNewProduct = () => {
    setShowNewProduct(true);
  };

  return (
    <div>
      <Navbar />
      {showNewProduct && (
        <NewProduct setShowNewProduct={setShowNewProduct} getData={getData} />
      )}
      {showEditDeleteButton && (
        <AdminProduct
          element={dataElement}
          getData={getData}
          setShowEditDeleteButton={setShowEditDeleteButton}
        />
      )}

      <div className="select-ubication-inventory-container">
        <form>
          <select
            className="select-ubication-inventory"
            value={ubication}
            onChange={changeInventoryUbication}
          >
            <option value="" disabled>
              Selecciona
            </option>
            <option value="villa colombia">Villa Colombia</option>
            <option value="unico">Unico</option>
          </select>
        </form>
        {showTableInventory && (
          <div className="inventory-buttons-container">
            <button
              className="button-new-product"
              onClick={changeShowNewProduct}
            >
              Nuevo Producto
            </button>
          </div>
        )}
        {/* {showTableInventory && <button className="button-new-ingredient">Nuevo Producto</button>} */}
      </div>
      {showInventoryMessage && (
        <p className="inventory-message">{inventoryMessage}</p>
      )}
      {showTableInventory && (
        <div className="tables-inventory-container">
          <div className="table-container">
            <h2 style={{ textAlign: "center" }}>
              Productos -{" "}
              <span
                style={{ fontSize: "2rem", backgroundColor: "greenyellow" }}
              >
                {totalJugos}
              </span>{" "}
              Jugos
            </h2>
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>PRODUCTO</th>
                  <th>CANTIDAD</th>
                </tr>
              </thead>
              <tbody>
                {productsUbication &&
                  productsUbication.map((element) => (
                    <tr
                      onClick={() => showForms(element)}
                      key={element.id + element.name}
                    >
                      <td className="name-inventory">
                        {element.category === "jugos"
                          ? `${element.name.toUpperCase()}`
                          : element.name.toUpperCase()}
                      </td>
                      <td
                        className={
                          element.quantity >= 7 && element.quantity <= 10
                            ? "yellow-color"
                            : element.quantity < 7
                            ? "red-color"
                            : "green-color"
                        }
                      >
                        {element.quantity}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="table-container">
            <h2 style={{ textAlign: "center" }}>Ingredientes</h2>
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>INGREDIENTE</th>
                  <th>GRAMOS</th>
                  <th>KILOS</th>
                </tr>
              </thead>
              <tbody>
                {inventoryUbication &&
                  inventoryUbication.map((element) => (
                    <tr
                      onClick={() => showForms(element)}
                      key={element.id + element.name}
                    >
                      <td className="name-inventory">
                        {element.name.toUpperCase().replace("_", " ")}
                      </td>
                      <td>{element.quantity}</td>
                      <td>{(element.quantity / 1000).toFixed(1)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="table-container">
            <h2 style={{ textAlign: "center" }}>Otros</h2>
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>OTROS</th>
                  <th>UNIDADES</th>
                </tr>
              </thead>
              <tbody>
                {othersUbication &&
                  othersUbication.map((element) => (
                    <tr
                      onClick={() => showForms(element)}
                      key={element.id + element.name}
                    >
                      <td className="name-inventory">
                        {element.name.toUpperCase()}
                      </td>
                      <td>{Math.floor(element.quantity)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
