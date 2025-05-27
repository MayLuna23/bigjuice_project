import { useEffect, useState } from "react";
import { ConfirmationMessage } from "../ConfirmationMessage/ConfirmationMessage";
import {
  BASE_API_URL,
  getInventory,
  getProducts,
} from "../../utils/api/bigjuice";
import axios from "axios";
import "./Inventory.css";

export function NewProduct({ setShowNewProduct, getData }) {
  const [category, setCategory] = useState("");
  const [showJugosForm, setShowJugosForm] = useState(false);
  const [showOtrosForm, setShowOtrosForm] = useState(false);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [heightForm, setHeightForm] = useState("");
  const [widthForm, setWidthFormForm] = useState("");
  const jwtToken = localStorage.getItem("jwtToken");
  const [showUnityMesuer, setShowUnityMesuer] = useState(false);
  const [unityMesure, setUnityMesure] = useState("");
  const [pulpaSelected, setPulpaSelected] = useState("");
  const [quantityPulpa, setQuantityPulpa] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showButtonForm, setShowButtonForm] = useState(false);
  const [message, setMessage] = useState("");
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
    saborizante: "",
    canela: "",
    miel: "",
    tarrina: 0,
    pitillo: 0,
    image: null,
  });
  const [ingredientForm, setIngredientForm] = useState({
    name: "",
    quantity: "",
    category: "",
    ubication: "",
  });

  const selectCategory = (categorySelected) => {
    setShowMessage(false);
    setMessage("");
    setCategory(categorySelected);
    const initialForm = { ...productForm };
    initialForm["category"] = categorySelected;
    setProductForm(initialForm);

    if (categorySelected === "jugos") {
      const initialForm = { ...productForm };
      initialForm["tarrina"] = 1;
      initialForm["pitillo"] = 1;
      setProductForm(initialForm);
      setShowJugosForm(true);
      setShowOtrosForm(false);
      setShowIngredientForm(false);
      setHeightForm("37rem");
      setWidthFormForm("30rem");
    }
    if (categorySelected === "otros") {
      const initialForm = { ...productForm };
      initialForm["tarrina"] = 0;
      initialForm["pitillo"] = 0;
      setShowOtrosForm(true);
      setShowJugosForm(false);
      setShowIngredientForm(false);
      setHeightForm("25rem");
    }
    if (categorySelected === "ingredient" || categorySelected === "others") {
      setShowIngredientForm(true);
      setShowOtrosForm(false);
      setShowJugosForm(false);
      setHeightForm("25rem");
    }
    setShowButtonForm(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductForm({ ...productForm, image: file }); // Cambiar "image" a "imagen"
  };

  const selectRequest = (event) => {
    event.preventDefault();
    if (category === "jugos" || category === "otros") {
      newProductRequest(event);
    }
    if (category === "ingredient" || category === "others") {
      newIngredientRequest(event);
    }
  };

  const newProductRequest = async (event) => {
    event.preventDefault();
    const finalData = { ...productForm };

    try {
      if (category === "jugos" && Object.keys(finalData).length < 16) {
        setShowMessage(true);
        setMessage("Por favor rellene todos los campos del formulario.");
        return;
      }

      if (
        (category !== "jugos" && finalData.name === "") ||
        finalData.sale_price === "" ||
        finalData.quantity === "" ||
        finalData.ubication === ""
      ) {
        setShowMessage(true);
        setMessage("Por favor rellene todos los campos del formulario.");
        return;
      }

      for (var key in finalData) {
        if (finalData.hasOwnProperty(key)) {
          if (finalData[key] === "") {
            finalData[key] = 0;
          }
        }
      }
      const request = await axios.post(
        `${BASE_API_URL}/products/new`,
        {
          ...finalData,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (request.data.status === 201) {
        getData();
        setShowNewProduct(false);
        setShowMessage(false);
        setMessage("");
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setShowMessage(true);
      console.error(error);
    }
  };

  const newIngredientRequest = async (event) => {
    event.preventDefault();
    const dataForm = { ...ingredientForm };

    if (unityMesure === "kg") {
      dataForm.quantity = dataForm.quantity * 1000;
    }

    try {
      const request = await axios.post(
        `${BASE_API_URL}/ingredients/new`,
        {
          ...dataForm,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (request.data.status === 201) {
        getData();
        setShowNewProduct(false);
        setShowMessage(false);
        setMessage("");
      }
    } catch (error) {
      console.error(error);
      setShowMessage(true);
      setMessage(error.response.data.message);
    }
  };

  const fillFormNewProduct = (e) => {
    const newProductForm = { ...productForm };
    // Convertir a número si es un campo numérico
    let value = parseFloat(e.target.value);
    // Redondear a dos decimales si es un número
    if (!isNaN(value)) {
      value = parseFloat(value.toFixed(2));
      newProductForm[e.target.name] = value;
      newProductForm["category"] = category;
      setProductForm(newProductForm);
      return;
    }
    newProductForm[e.target.name] = e.target.value;
    newProductForm["category"] = category;
    setProductForm(newProductForm);
  };

  const fillFormNewIngredient = (e) => {
    const newIngredientForm = { ...ingredientForm };
    // Convertir a número si es un campo numérico
    let value = parseFloat(e.target.value);
    // Redondear a dos decimales si es un número
    if (!isNaN(value)) {
      value = parseFloat(value.toFixed(2));
      newIngredientForm[e.target.name] = value;
      newIngredientForm["category"] = category;
      setIngredientForm(newIngredientForm);
      return;
    }
    newIngredientForm[e.target.name] = e.target.value;
    newIngredientForm["category"] = category;
    setIngredientForm(newIngredientForm);
  };

  const updatePulpa = (value) => {
    setPulpaSelected(value);
    const newProductForm = { ...productForm };
    newProductForm.value = "";
    setProductForm(newProductForm);
  };

  const updateQuantityPulpa = (value) => {
    const finalQuantity = parseFloat(value);
    setQuantityPulpa(finalQuantity);
    const newProductForm = { ...productForm };
    newProductForm[pulpaSelected] = finalQuantity;
    setProductForm(newProductForm);
  };

  return (
    <div>
      <ConfirmationMessage height={heightForm} width={widthForm}>
        <p
          title="Cerrar"
          className="close-confirmationmessage-inventory"
          onClick={() => setShowNewProduct(false)}
        >
          x
        </p>
        <h2>Registrar Producto / Elemento</h2>
        <p>Categoria:</p>
        <form>
          <select
            type="text"
            value={category}
            onChange={(e) => selectCategory(e.target.value)}
          >
            <option value="" disabled></option>
            <option value="jugos">Producto - Jugos</option>
            <option value="otros">Producto - Otros</option>
            <option value="ingredient">Elemento - Ingrediente</option>
            <option value="others">Elemento - Otros</option>
          </select>
          {showJugosForm && (
            <div className="new-jugo-form">
              <div>
                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={productForm.name}
                  onChange={fillFormNewProduct}
                />
                <label>Precio ($)</label>
                <input
                  type="number"
                  name="sale_price"
                  value={productForm.sale_price}
                  onChange={fillFormNewProduct}
                />
                <label>Hielo (gr)</label>
                <input
                  type="number"
                  name="hielo"
                  value={productForm.hielo}
                  onChange={fillFormNewProduct}
                />
                <label>Leche (gr)</label>
                <input
                  type="number"
                  name="leche"
                  value={productForm.leche}
                  onChange={fillFormNewProduct}
                />
                <label>Leche en Polvo (gr)</label>
                <input
                  type="number"
                  name="leche_polvo"
                  value={productForm.leche_polvo}
                  onChange={fillFormNewProduct}
                />
                <label>Azucar (gr)</label>
                <input
                  type="number"
                  name="azucar"
                  value={productForm.azucar}
                  onChange={fillFormNewProduct}
                />
                <label>Imagen:</label>
                <input type="file" name="image" onChange={handleImageChange} />
              </div>
              <div>
                <label>Saborizante (gr)</label>
                <input
                  type="number"
                  name="saborizante"
                  value={productForm.saborizante}
                  onChange={fillFormNewProduct}
                />
                <label>Canela (gr)</label>
                <input
                  type="number"
                  name="canela"
                  value={productForm.canela}
                  onChange={fillFormNewProduct}
                />
                <label>Miel (gr)</label>
                <input
                  type="number"
                  name="miel"
                  value={productForm.miel}
                  onChange={fillFormNewProduct}
                />
                <label>Stock Inicial (Und)</label>
                <input
                  type="number"
                  name="quantity"
                  value={productForm.quantity}
                  onChange={fillFormNewProduct}
                />
                <label>Ubicación</label>
                <select
                  name="ubication"
                  type="text"
                  value={productForm.ubication}
                  onChange={fillFormNewProduct}
                >
                  <option value="" disabled></option>
                  <option value="villa colombia">Villa Colombia</option>
                  <option value="unico">Unico</option>
                </select>
                <label>Pulpa</label>
                <select
                  name="pulpa"
                  type="text"
                  value={pulpaSelected || ""}
                  onChange={(e) => updatePulpa(e.target.value)}
                >
                  <option value="" disabled>
                    ...
                  </option>
                  <option value="pulpa_mora">Mora</option>
                  <option value="pulpa_mango">Mango</option>
                  <option value="pulpa_lulo">Lulo</option>
                  <option value="pulpa_maracuya">Maracuya</option>
                  <option value="pulpa_guanabana">Guanabana</option>
                  <option value="pulpa_borojo">Borojo</option>
                </select>
                <label>Cantidad de Pulpa (gr)</label>
                <input
                  type="number"
                  name="pulpa"
                  value={quantityPulpa}
                  onChange={(e) => updateQuantityPulpa(e.target.value)}
                />
              </div>
            </div>
          )}
          {showOtrosForm && (
            <div className="new-product-form">
              <label>Nombre</label>
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={fillFormNewProduct}
              />
              <label>Precio ($)</label>
              <input
                type="number"
                name="sale_price"
                value={productForm.sale_price}
                onChange={fillFormNewProduct}
              />
              <label>Stock Inicial (Und)</label>
              <input
                type="number"
                name="quantity"
                value={productForm.quantity}
                onChange={fillFormNewProduct}
              />
              <label>Ubicación</label>
              <select
                name="ubication"
                type="text"
                value={productForm.ubication}
                onChange={fillFormNewProduct}
              >
                <option value="" disabled></option>
                <option value="villa colombia">Villa Colombia</option>
                <option value="unico">Unico</option>
              </select>
              <label>Imagen:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </div>
          )}
          {showIngredientForm && (
            <div className="new-product-form">
              <label>Nombre</label>
              <input
                type="text"
                name="name"
                value={ingredientForm.name}
                onChange={fillFormNewIngredient}
              />
              <label>Unidad de medida</label>
              <select
                name="mesure"
                type="text"
                value={unityMesure}
                onChange={(e) => setUnityMesure(e.target.value)}
              >
                <option value="" disabled></option>
                <option value="und">Unidades</option>
                <option value="kg">Kilogramos</option>
                <option value="gr">Gramos</option>
              </select>
              <label>Cantidad</label>
              <input
                type="number"
                name="quantity"
                value={ingredientForm.quantity}
                onChange={fillFormNewIngredient}
              />
              <label>Ubicación</label>
              <select
                name="ubication"
                type="text"
                value={ingredientForm.ubication}
                onChange={fillFormNewIngredient}
              >
                <option value="" disabled></option>
                <option value="villa colombia">Villa Colombia</option>
                <option value="unico">Unico</option>
              </select>
              {/* {showMessage && <p className="error-message">{message}</p>} */}
            </div>
          )}
          {showMessage && <p className="error-message">{message}</p>}
          {showButtonForm && (
            <div className="button-new-inventory-container">
              <button
                className="button-new-inventory"
                onClick={(e) => selectRequest(e)}
              >
                Crear
              </button>
            </div>
          )}
        </form>
      </ConfirmationMessage>
    </div>
  );
}
