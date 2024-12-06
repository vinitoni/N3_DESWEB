import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail, signInWithGoogle, signInWithGithub } from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await loginWithEmail(email, password);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/shop");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/shop");
    } catch (err) {
      setError("Erro ao fazer login com Google.");
    }
  };

  const handleGithubLogin = async () => {
    try {
      const user = await signInWithGithub();
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/shop");
    } catch (err) {
      setError("Erro ao fazer login com GitHub.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleEmailLogin}>
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
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleLogin}>Login com Google</button>
      <button onClick={handleGithubLogin}>Login com GitHub</button>
      <button onClick={() => navigate("/register")} className="register-button">
        Registrar
      </button>
    </div>
  );
}

export default Login;
