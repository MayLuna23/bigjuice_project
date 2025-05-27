import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { BASE_API_URL } from "../../utils/api/bigjuice";
import "./ProductCard.css";

export const ProductCard = ({ data, addToShopcar, removeFromShopcar }) => {
  const name = data.name.toUpperCase();
  const value = data.sale_price.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return (
    <div className="product-card">
      <div
        title={`Cantidad de ${name} en el inventario`}
        className="number-products-vender"
      >
        <p>{data.quantity}</p>
      </div>
      <div className="name-product-container">
        <p>{name}</p>
      </div>

      <div className="product-image-container">
        <img
          className="product-image"
          src={`${BASE_API_URL}/products/images/${data.image}`}
          alt={name}
        />
      </div>

      <p
        className="add-product product-button"
        onClick={() => addToShopcar(data)}
      >
        <FaPlus />
      </p>
      <p
        className="remove-product product-button"
        onClick={() => removeFromShopcar(data)}
      >
        <FaMinus />
      </p>

      <div className="price-product-container">
        <p>{value}</p>
      </div>
    </div>
  );
};
