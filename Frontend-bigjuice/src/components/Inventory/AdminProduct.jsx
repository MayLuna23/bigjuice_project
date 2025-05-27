import { ConfirmationMessage } from "../ConfirmationMessage/ConfirmationMessage";
import axios from "axios";
import {
  BASE_API_URL,
  getInventory,
  getProducts,
} from "../../utils/api/bigjuice";
import { useEffect, useState } from "react";

export function AdminProduct({ element, getData, setShowEditDeleteButton }) {
  const [height, setHeight] = useState("");
  const [optionButton, setOptionButton] = useState(false);
  const [showAdminButtons, setShowAdminButtons] = useState(true);
  const jwtToken = localStorage.getItem("jwtToken");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const [showJugosForm, setShowJugosForm] = useState(false);
  const [showOtrosForm, setShowOtrosForm] = useState(false);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [unityMesure, setUnityMesure] = useState("");
  const [productForm, setProductForm] = useState({
    // name: "",
    // quantity: "",
    // sale_price: "",
    // category: "",
    // ubication: "",
    // hielo: "",
    // leche: "",
    // leche_polvo: "",
    // azucar: "",
    // // pulpa: "",
    // saborizante: "",
    // canela: "",
    // miel: "",
    // tarrina: 0,
    // pitillo: 0,
  });
  const [ingredientForm, setIngredientForm] = useState({
    name: "",
    quantity: "",
    category: "",
    ubication: "",
  });
  const [pulpaSelected, setPulpaSelected] = useState("");
  const [quantityPulpa, setQuantityPulpa] = useState("");

  useEffect(() => {
    for (var property in element) {
      // Verificar si la propiedad contiene la palabra "pulpa" y su valor es diferente de 0
      if (property.includes("pulpa") && element[property] > 0) {
        setPulpaSelected(property);
        setQuantityPulpa(element[property]);
      }
    }
  }, []);

  useEffect(() => {
    if (element.category === "jugos" || element.category === "otros") {
      setProductForm(element);
    } else {
      setIngredientForm(element);
    }
  }, []);

  const editElement = () => {
    if (element.category === "jugos") {
      setShowJugosForm(true);
      setShowOtrosForm(false);
      setShowIngredientForm(false);
    }
    if (element.category === "otros") {
      setShowOtrosForm(true);
      setShowJugosForm(false);
      setShowIngredientForm(false);
      setHeight("25rem");
    }
    if (element.category === "ingredient" || element.category === "others") {
      setShowIngredientForm(true);
      setShowJugosForm(false);
      setShowOtrosForm(false);
    }
    setOptionButton(true);
    if (element.category === "jugos") {
      setHeight("33rem");
    }
    setShowAdminButtons(false);
  };

  const deleteElement = () => {
    setDeleteConfirmation(true);
    setShowAdminButtons(false);
  };

  const fillFormNewProduct = (e) => {
    try {
      const newProductForm = { ...productForm };
      let value = parseFloat(e.target.value);
      if (!isNaN(value)) {
        value = parseFloat(value.toFixed(2));
        newProductForm[e.target.name] = value;
        setProductForm(newProductForm);
        return;
      }
      newProductForm[e.target.name] = e.target.value;

      setProductForm(newProductForm);
    } catch (error) {
      console.error(error);
    }
  };

  const fillFormNewIngredient = (e) => {
    const newIngredientForm = { ...ingredientForm };
    // Convertir a número si es un campo numérico
    let value = parseFloat(e.target.value);
    // Redondear a dos decimales si es un número
    if (!isNaN(value)) {
      value = parseFloat(value.toFixed(2));
      newIngredientForm[e.target.name] = value;

      setIngredientForm(newIngredientForm);
      return;
    }
    newIngredientForm[e.target.name] = e.target.value;

    setIngredientForm(newIngredientForm);
  };

  const selectRequest = (event) => {
    event.preventDefault();
    if (element.category === "jugos" || element.category === "otros") {
      editProductRequest(event);
    }
    if (element.category === "ingredient" || element.category === "others") {
      editIngredientRequest(event);
    }
  };

  const editProductRequest = async (event) => {
    event.preventDefault();
    const finalData = { ...productForm };
    for (var key in finalData) {
      if (finalData.hasOwnProperty(key)) {
        if (finalData[key] === "") {
          finalData[key] = 0;
        }
      }
    }
    try {
      const request = await axios.put(
        `${BASE_API_URL}/products/edit/${element.id}`,
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
      getData();
      setShowEditDeleteButton(false);
    } catch (error) {
      console.error(error);
    }
  };

  const editIngredientRequest = async (event) => {
    event.preventDefault();
    const dataForm = { ...ingredientForm };

    try {
      const request = await axios.put(
        `${BASE_API_URL}/ingredients/edit/${element.id}`,
        {
          ...dataForm,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      getData();
      setShowEditDeleteButton(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRequest = async () => {
    if (element.category === "jugos" || element.category === "otros") {
      const request = await axios.delete(
        `${BASE_API_URL}/products/remove/${element.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      getData();
      setShowEditDeleteButton(false);
    }
    if (element.category === "ingredient" || element.category === "others") {
      const request = await axios.delete(
        `${BASE_API_URL}/ingredients/remove/${element.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      getData();
      setShowEditDeleteButton(false);
    }
  };

  const cancelDeleteForm = () => {
    setShowEditDeleteButton(false);
    setDeleteConfirmation(false);
    setOptionButton(false);
  };

  const editQuantityPulpa = (value) => {
    const newProductForm = { ...productForm };
    newProductForm[pulpaSelected] = value;
    setProductForm(newProductForm);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductForm({ ...productForm, image: file }); // Cambiar "image" a "imagen"
  };

  return (
    <div>
      <ConfirmationMessage height={height}>
        <p
          title="Cerrar"
          className="close-confirmationmessage-inventory"
          onClick={() => setShowEditDeleteButton(false)}
        >
          x
        </p>
        {/* <h2 style={{textAlign: "center"}} >Elija que desea hacer</h2> */}
        {showAdminButtons && (
          <div className="edit-delete-product-buttons">
            <h2>{element.name.toUpperCase()}</h2>
            <div className="buttons-admin-inventory">
              <button
                className="button-delete-inventory"
                onClick={deleteElement}
              >
                Eliminar
              </button>
              {/* <button onClick={() => deleteElement()}>Eliminar</button> */}
              <button
                className="button-edit-inventory"
                onClick={() => editElement()}
              >
                Editar
              </button>
            </div>
          </div>
        )}
        {deleteConfirmation && (
          <>
            <h2 style={{ textAlign: "center" }}>¿Desea realmente eliminar</h2>
            <h2 style={{ textAlign: "center" }}>
              {element.name.toUpperCase()} ?
            </h2>
            <div className="edit-delete-product-buttons">
              <button
                className="button-delete-inventory"
                onClick={deleteRequest}
              >
                Confirmar
              </button>
              <button
                className="button-edit-inventory"
                onClick={cancelDeleteForm}
              >
                Cancelar
              </button>
            </div>
          </>
        )}
        {optionButton && (
          <form>
            <h2>Editar Producto / Elemento</h2>
            {showJugosForm && (
              <div className="new-jugo-form">
                <div>
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={productForm.name.toUpperCase()}
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
                </div>
                <div>
                  <label>Pulpa (gr)</label>
                  <input
                    type="number"
                    name="pulpa"
                    value={productForm[pulpaSelected]}
                    // value={quantityPulpa}
                    onChange={(e) => editQuantityPulpa(e.target.value)}
                  />
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
                  <label>Cantidad (Und)</label>
                  <input
                    type="number"
                    name="quantity"
                    value={productForm.quantity}
                    onChange={fillFormNewProduct}
                  />
                  <label>Ubicación</label> <br />
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
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
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
                  value={productForm.name.toUpperCase()}
                  onChange={fillFormNewProduct}
                />
                <label>Precio ($)</label>
                <input
                  type="number"
                  name="sale_price"
                  value={productForm.sale_price}
                  onChange={fillFormNewProduct}
                />
                <label>Cantidad (Und)</label>
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
                  value={ingredientForm.name.toUpperCase()}
                  onChange={fillFormNewIngredient}
                />
                <label>
                  Cantidad{" "}
                  {ingredientForm.category === "ingredient" ? "(gr)" : "(Und)"}
                </label>
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
              </div>
            )}
            <div className="edit-inventory-button-container">
              <button
                className="edit-inventory-button"
                onClick={(e) => selectRequest(e)}
              >
                Editar
              </button>
            </div>
          </form>
        )}
      </ConfirmationMessage>
    </div>
  );
}
