import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const sampleData = [
  { id: 1, name: "Cliente 1", ativo: true, detalhes: "Cliente ativo desde 2021." },
  { id: 2, name: "Cliente 2", ativo: false, detalhes: "Conta suspensa por inadimplência." },
  { id: 3, name: "Cliente 3", ativo: true, detalhes: "Ativo, bom pagador." },
];

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = sampleData.find((item) => item.id === parseInt(id));

  if (!client) {
    return <h1>Cliente não encontrado.</h1>;
  }

  return (
    <div className="details-container">
      <h1>Detalhes do Cliente</h1>
      <p><strong>ID:</strong> {client.id}</p>
      <p><strong>Nome:</strong> {client.name}</p>
      <p><strong>Ativo:</strong> {client.ativo ? "Sim" : "Não"}</p>
      <p><strong>Detalhes:</strong> {client.detalhes}</p>
      <button onClick={() => navigate("/dashboard")}>Voltar</button>
    </div>
  );
}

export default Details;
