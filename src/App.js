import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Shop from "./pages/Shop";
import LanguageSwitcher from "./components/LanguageSwitcher"; // Importado

function App() {
  return (
    <Router>
      <div className="app-container">
        <LanguageSwitcher /> {/* Botão de troca de idioma */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
