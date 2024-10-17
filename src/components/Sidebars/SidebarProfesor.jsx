import React, { useState } from 'react';
import { FaPalette, FaGlobe , FaCalendarAlt, FaChalkboardTeacher, FaBook, FaEnvelope, FaUser, FaHome, FaCaretDown, FaCaretUp, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SidebarProfesor = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleConfig = () => {
    setIsConfigOpen(!isConfigOpen);
  };

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <FaHome className="text-gray-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-900 font-semibold">Usuario_123456</p>
          </div>
        </div>
      </div>
      <nav className="px-6">
        <ul className="space-y-2">
          {/* Mis Clases Dropdown */}
          <li>
            <div className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer" onClick={toggleDropdown}>
              <FaChalkboardTeacher className="text-gray-600" />
              <span>Mis Clases</span>
              <span className="ml-auto">
                {isDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
              </span>
            </div>
            {isDropdownOpen && (
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <a href="/vistaclase" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    <span>Clase 1</span>
                  </a>
                </li>
                <li>
                  <a href="/class-2" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    <span>Clase 2</span>
                  </a>
                </li>
                <li>
                  <a href="/class-3" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    <span>Clase 3</span>
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a href="/calendar" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <FaCalendarAlt className="text-gray-600" />
              <span>Calendario</span>
            </a>
          </li>
          <li>
            <a href="/grades" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <FaBook className="text-gray-600" />
              <span>Notas</span>
            </a>
          </li>
          <li>
            <a href="/messages" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <FaEnvelope className="text-gray-600" />
              <span>Mensajes</span>
            </a>
          </li>
          <li>
            <div className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer" onClick={toggleConfig}>
              <FaCog className="text-gray-600" />
              <span>Configuración</span>
            </div>
          </li>
        </ul>
      </nav>

      {isConfigOpen && (
        <ConfigModal onClose={toggleConfig} user={user} />
      )}

      <footer className="p-4 border-t border-gray-300">
        <a href="/logout" className="flex items-center text-red-400 hover:underline">
          <span>Cerrar Sesión</span>
        </a>
      </footer>
    </div>
  );
};

const ConfigModal = ({ onClose, user }) => {
  const [activeTab, setActiveTab] = useState('configuracion');

  const renderContent = () => {
    switch (activeTab) {
      case 'configuracion':
        return <p>Ajustes generales de configuración...</p>;
      case 'perfil':
        return <p>Información y ajustes del perfil...</p>;
      case 'idioma':
        return <p>Opciones de idioma y región...</p>;
      case 'tema':
        return <p>Opciones de tema visual...</p>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center rounded-[15px] p-10">
      <div className="relative bg-white flex rounded-[15px] shadow-lg w-2/3">
        
        {/* Botón de cierre en forma de círculo rojo */}
        <div
          onClick={onClose}
          className="absolute top-4 right-4 w-4 h-4 bg-[#ca1c1c] rounded-full flex items-center justify-center cursor-pointer"
        >
        </div>

        {/* Sidebar de configuración */}
        <div className="w-1/4 bg-gray-100 p-6 border-r rounded-[15px]">
          <div>
            <h1 className='text-gray-500 mt-0 mb-2 font-semibold text-[16px]'>Cuenta</h1>
          </div>
          {/* Imagen de perfil y nombre de usuario */}
          <div className="flex items-center mb-6">
            <img
              src="https://via.placeholder.com/50"
              alt="profile"
              className="w-8 h-8 rounded-full mr-4"
            />
            <p className="text-base">Usuario</p>
          </div>

          {/* Opciones del sidebar */}
          <ul className="space-y-4 items-start">
            <li 
              className={`flex items-center space-x-2 cursor-pointer text-gray-700 hover:bg-gray-300 hover:rounded-[15px] w-[110%] h-10 pl-3 ${activeTab === 'configuracion' ? 'text-blue-600' : ''} rounded-lg transition-all`}
              onClick={() => setActiveTab('configuracion')}
            >
              <FaCog /> <span>Configuración</span>
            </li>
            <li 
              className={`flex items-center space-x-2 cursor-pointer text-gray-700 hover:bg-gray-300 hover:rounded-[15px] w-[110%] h-10 pl-3 ${activeTab === 'perfil' ? 'text-blue-600' : ''} rounded-lg transition-all`}
              onClick={() => setActiveTab('perfil')}
            >
              <FaUser /> <span>Mi perfil</span>
            </li>
            <li 
              className={`flex items-center space-x-2 cursor-pointer text-gray-700 hover:bg-gray-300 hover:rounded-[15px] w-[110%] h-10 pl-3 ${activeTab === 'idioma' ? 'text-blue-600' : ''} rounded-lg transition-all`}
              onClick={() => setActiveTab('idioma')}
            >
              <FaGlobe /> <span>Idioma y región</span>
            </li>
            <li 
              className={`flex items-center space-x-2 cursor-pointer text-gray-700 hover:bg-gray-300 hover:rounded-[15px] w-[110%] h-10 pl-3 ${activeTab === 'tema' ? 'text-blue-600' : ''} rounded-lg transition-all`}
              onClick={() => setActiveTab('tema')}
            >
              <FaPalette /> <span>Tema</span>
            </li>
          </ul>

        </div>
        
        {/* Contenido principal dinámico */}
        <div className="w-3/4 p-6">
          <h2 className="text-xl font-semibold mb-4">
            {activeTab === 'configuracion' && 'Configuración'}
            {activeTab === 'perfil' && 'Mi perfil'}
            {activeTab === 'idioma' && 'Idioma y región'}
            {activeTab === 'tema' && 'Tema'}
          </h2>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SidebarProfesor;
