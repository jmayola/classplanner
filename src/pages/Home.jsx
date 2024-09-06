import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebars/SidebarAlumno';
import Form from '../components/form';
import Footer from '../components/Footer';

function Home() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="flex bg-gray-100 h-screen">
      <Sidebar />
      <div className="flex-grow p-12 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-medium text-gray-800 mb-8">Página de Inicio</h1>
        <Form />
        <button
          onClick={handleLoginRedirect}
          className="mt-8 px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
        >
          Ir a Iniciar Sesión
        </button>
      </div>
    </div>
  );
}

export default Home;
