import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { useTranslation } from "react-i18next";

const sampleProducts = [
  { id: 1, name: "Produto 1", price: 50 },
  { id: 2, name: "Produto 2", price: 75 },
  { id: 3, name: "Produto 3", price: 100 },
  { id: 4, name: "Produto 4", price: 25 },
  { id: 5, name: "Produto 5", price: 200 },
];

function Shop() {
  const { t } = useTranslation();
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();

  const totalPages = Math.ceil(sampleProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sampleProducts.slice(startIndex, endIndex);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("user");
    navigate("/");
  };

  const totalItems = cart.length;
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1>{t("welcome")}</h1>
        <div className="shop-actions">
          <button onClick={() => navigate("/dashboard")}>{t("view_profile")}</button>
          <button onClick={handleLogout}>{t("logout")}</button>
        </div>
      </div>
      <div className="cart-summary">
        <p>{t("items_in_cart")} {totalItems}</p>
        <p>{t("total_price")} R$ {totalPrice.toFixed(2)}</p>
      </div>
      <div className="product-list">
        {currentItems.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>R$ {product.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(product)}>{t("add_to_cart")}</button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          {t("previous")}
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
}

export default Shop;
