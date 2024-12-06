import React, { useState, useEffect } from "react";
import { logout, getUserData } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Quantos itens por página
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authUser = JSON.parse(localStorage.getItem("user"));
        if (!authUser) {
          navigate("/");
          return;
        }

        const data = await getUserData(authUser.uid);
        setUserData(data);

        if (data.isAdmin) {
          await fetchAllUsers(); // Admins podem ver todos os usuários
        } else {
          setUsers([{ id: authUser.uid, ...data }]); // Usuário comum vê apenas seus dados
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do usuário:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const fetchAllUsers = async () => {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersData);
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("user");
    navigate("/");
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = users.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>{userData?.isAdmin ? "Admin Dashboard" : "Meu Perfil"}</h1>
      <p>Bem-vindo, {userData?.name}!</p>

      {userData?.isAdmin && (
        <>
          <h2>Lista de Usuários</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Administrador</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Sim" : "Não"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </div>
        </>
      )}

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
