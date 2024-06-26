import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";

const MisCompras = () => {
  const { user } = useContext(AuthContext);
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_ENDPOINT_BASE}/sales/user/${user.id}`
      );
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-center">Mis Compras</h1>
      {sales.length > 0 ? (
        sales.map((sale) => (
          <div
            key={sale.id}
            className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-lg"
          >
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Compra #{sale.id}</h2>
                <p className="text-gray-600">
                  {new Date(sale.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">
                  Total: ${sale.total_price}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Detalles:</h3>
              <ul className="space-y-4">
                {sale.sale_details.map((detail) => (
                  <li
                    key={detail.id}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center">
                      <img
                        src={detail.product.image}
                        alt={detail.product.name}
                        className="w-16 h-16 rounded-md object-cover mr-4"
                      />
                      <div>
                        <p className="font-medium">
                          Producto: {detail.product.name}
                        </p>
                        <p>Cantidad: {detail.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p>
                        Precio:{" "}
                        <span className="font-medium text-green-600">
                          ${detail.price}
                        </span>
                      </p>
                      <p>
                        Subtotal:{" "}
                        <span className="font-medium text-green-600">
                          ${detail.subtotal}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No has realizado compras.</p>
      )}
    </div>
  );
};

export default MisCompras;
