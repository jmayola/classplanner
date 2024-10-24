import React, { useState } from 'react';
import { FaPalette, FaGlobe, FaCalendarAlt, FaChalkboardTeacher, FaBook, FaEnvelope, FaUser, FaHome, FaCaretDown, FaCaretUp, FaCog, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SidebarProfesor = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const user = {
    user_name: 'Juan',
    user_lastname: 'Pérez',
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleConfig = () => {
    setIsConfigOpen(!isConfigOpen);
  };

  return (
    <div className="w-64 bg-[#f7f7ff] shadow-md">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <FaUser className="text-gray-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-900 font-semibold">{user.user_name} {user.user_lastname}</p>
          </div>
        </div>
      </div>
      <nav className="px-6">
        <ul className="space-y-2"> {/* Cambié space-y-2 a space-y-2 */}
          <li>
            <Link to="/iniciodocente" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <FaHome className="text-gray-600" />
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <div className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer" onClick={toggleDropdown}>
              <FaChalkboardTeacher className="text-gray-600" />
              <Link to="/listaclases">
                <span>Mis clases</span>
              </Link>
              <span className="ml-auto">
                {isDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
              </span>
            </div>
            {isDropdownOpen && (
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <Link to="/vistaclase" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    <span>Clase 1</span>
                  </Link>
                </li>
                <li>
                  <Link to="/vistaclase" className="flex items-center space-x-4 py-2  text-gray-700 hover:bg-gray-100 rounded-lg">
                    <span>Clase 2</span>
                  </Link>
                </li>
                <li>
                  <Link to="/vistaclase" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    <span>Clase 3</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/calificaciones" className="flex items-center space-x-4 text-gray-700 hover:bg-gray-100 rounded-lg">
              <FaBook className="text-gray-600" />
              <span>Calificaciones</span>
            </Link>
          </li>
          <li>
            <div className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer" onClick={toggleConfig}>
              <FaCog className="text-gray-600" />
              <span>Configuración</span>
            </div>
          </li>

          <div>
            <h3 className="text-[14px] text-gray-500 mt-6">Clases en las que estoy inscripto</h3>
            <div className="overflow-y-auto max-h-40 shadow-bottom">
              <Link to="/vistaclase" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <FaBook className="text-gray-600" />
                <span>Clase 1</span>
              </Link>
              <Link to="/vistaclase" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <FaBook className="text-gray-600" />
                <span>Clase 2</span>
              </Link>
              <Link to="/vistaclase" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <FaBook className="text-gray-600" />
                <span>Clase 3</span>
              </Link>
              <Link to="/vistaclase" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <FaBook className="text-gray-600" />
                <span>Clase 1</span>
              </Link>
              <Link to="/vistaclase" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <FaBook className="text-gray-600" />
                <span>Clase 2</span>
              </Link>
              <Link to="/vistaclase" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <FaBook className="text-gray-600" />
                <span>Clase 3</span>
              </Link>
            </div>
          </div>


          <li className='mt-10'>
            <Link to="/calendario" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <FaCalendarAlt className="text-gray-600" />
              <span>Calendario</span>
            </Link>
          </li>
        </ul>
      </nav>


      {isConfigOpen && (
        <ConfigModal onClose={toggleConfig} user={user} />
      )}

      <footer className="p-4 border-t border-gray-300">
        <Link to="/logout" className="flex items-center text-red-400 hover:underline">
          <span>Cerrar Sesión</span>
        </Link>
      </footer>
    </div>
  );
};

const ConfigModal = ({ onClose, user }) => {
  const [activeTab, setActiveTab] = useState('configuracion');

  const renderContent = () => {
    switch (activeTab) {
      case 'configuracion':
        return (
          <div>
            <h3 className="mb-2 font-semibold">Configuración de la cuenta</h3>
            <label className="block mb-2">Cambiar contraseña</label>
            <input type="password" className="border rounded p-2 mb-4 w-full" placeholder="Nueva contraseña" />
            
            <label className="block mb-2">Notificaciones</label>
            <div className="mb-4">
              <input type="checkbox" id="notificaciones" className="mr-2" />
              <label htmlFor="notificaciones">Habilitar notificaciones por email</label>
            </div>
            
            <label className="block mb-2">Privacidad</label>
            <select className="border rounded p-2 mb-4 w-full">
              <option>Perfil público</option>
              <option>Solo amigos</option>
              <option>Privado</option>
            </select>
          </div>
        );
      case 'perfil':
        return (
          <div>
            <h3 className="mb-2 font-semibold">Información del perfil</h3>
            <label className="block mb-2">Nombre</label>
            <input type="text" className="border rounded p-2 mb-4 w-full" value={user.user_name} />
            
            <label className="block mb-2">Apellido</label>
            <input type="text" className="border rounded p-2 mb-4 w-full" value={user.user_lastname} />
            
            <label className="block mb-2">Foto de perfil</label>
            <input type="file" className="mb-4" />
          </div>
        );
      case 'idioma':
        return (
          <div>
            <h3 className="mb-2 font-semibold">Idioma y región</h3>
            <label className="block mb-2">Idioma preferido</label>
            <select className="border rounded p-2 mb-4 w-full">
              <option>Español</option>
              <option>Inglés</option>
              <option>Francés</option>
            </select>
            
            <label className="block mb-2">Zona horaria</label>
            <select className="border rounded p-2 mb-4 w-full">
              <option>GMT-3</option>
              <option>GMT-5</option>
              <option>GMT+1</option>
            </select>
          </div>
        );
      case 'tema':
        return (
          <div>
            <h3 className="mb-2 font-semibold">Tema visual</h3>
            <label className="block mb-2">Selecciona un tema</label>
            <select className="border rounded p-2 mb-4 w-full">
              <option>Claro</option>
              <option>Oscuro</option>
            </select>
            
            <label className="block mb-2">Personalizar color</label>
            <input type="color" className="w-12 h-12 p-0" />
          </div>
        );
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
            <p className="text-base">{user.user_name} {user.user_lastname}</p>
          </div>

          {/* Opciones del sidebar */}
          <ul className="space-y-2 items-start">
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
