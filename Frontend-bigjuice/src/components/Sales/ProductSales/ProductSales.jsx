import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import "./ProductSales.css";

export const ProductSales = ({
  sdate,
  edate,
  salesEachProduct,
  setShowAsideSalesButton,
  setShowAsideSales,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (Array.isArray(salesEachProduct?.data?.data)) {
      setData(salesEachProduct.data.data);
    }
  }, [salesEachProduct]);

  const closeAsideSales = () => {
    setShowAsideSalesButton(true);
    setShowAsideSales(false);
  };

  return (
    <aside className="product-sales-aside">
      <div className="close-button-aside-product-sales">
        <IoClose
          onClick={() => closeAsideSales()}
          title="Cerrar ventas por cada producto"
          color="red"
          size={"1.5rem"}
          style={{ cursor: "pointer" }}
        />
      </div>

      <section>
        <h3
          style={{ marginBottom: "20px" }}
        >{`Productos vendidos entre ${sdate} y ${edate}`}</h3>
      </section>
      <main className="container-table-product-sales">
        <table className="aside-table-product-sales">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((prod) => (
                <tr key={prod.name + prod.quantity}>
                  <td>{prod.name}</td>
                  <td>{prod.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No hay datos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </aside>
  );
};
