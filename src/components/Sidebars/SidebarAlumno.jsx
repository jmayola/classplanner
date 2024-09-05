// Sidebar.jsx
import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 p-4 flex flex-col">
      {/* Perfil de usuario */}
      <div className="flex items-center mb-6">
        <img
          src="https://via.placeholder.com/40"
          alt="User Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="text-sm font-medium">Nombre de Usuario</p>
          <p className="text-xs text-gray-500">Nombre de la Persona</p>
        </div>
      </div>
      
      {/* Título del Sidebar */}
      <h1 className="text-lg font-bold mb-4">Sidebar Title</h1>

      {/* Categorías con iconos */}
      <ul>
        <li className="flex items-center mb-2">
          <span>Inicio</span>
        </li>
        <li className="flex items-center mb-2">
          
          <span>Perfil</span>
        </li>
        <li className="flex items-center mb-2">
          <span>Configuraciones</span>
        </li>
        <li className="flex items-center mb-2">
          <span>Estadísticas</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
