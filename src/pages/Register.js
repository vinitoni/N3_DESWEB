import React, { useState } from "react";
import { registerWithEmailAndPassword } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmailAndPassword(name, email, password);
      alert("Cadastro realizado com sucesso!");
      navigate("/"); // Voltar para login após cadastro
    } catch (error) {
      alert("Erro ao cadastrar: " + error.message);
    }
  };

  return (
    <div className="register-container">
      <h1>Registro</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
      <button className="back-button" onClick={() => navigate("/")}>
        Voltar ao Login
      </button>
    </div>
  );
}

export default Register;
