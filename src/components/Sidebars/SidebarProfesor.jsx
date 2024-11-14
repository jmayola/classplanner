import React, { useState, useEffect } from 'react';
import { FaPalette, FaGlobe, FaCalendarAlt, FaChalkboardTeacher, FaBook, FaEnvelope, FaUser, FaHome, FaCaretDown, FaCaretUp, FaCog, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SidebarProfesor = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [user, setUser] = useState({ user_name: '', user_lastname: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/user')
      .then(response => {
        if (response.data) {
          setUser({
            user_name: response.data.user_name,
            user_lastname: response.data.user_lastname
          });
          setError(null);
        } else {
          setError("No se encontraron datos del usuario.");
        }
      })
      .catch(() => {
        setError("Error al cargar el nombre del usuario.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleConfig = () => {
    setIsConfigOpen(!isConfigOpen);
  };

  return (
    <div className="w-64 bg-[#F7F7FF] shadow-md">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <FaUser className="text-gray-600 text-2xl" />
          </div>
          <div>
            {isLoading ? (
              <p className="text-gray-500 font-semibold">Cargando...</p>
            ) : error ? (
              <p className="text-red-500 font-semibold">{error}</p>
            ) : (
              <p className="text-gray-900 font-semibold">
                {user.user_name} {user.user_lastname}
              </p>
            )}
          </div>
        </div>
      </div>
  
      <nav className="px-6">
        <ul className="space-y-2">
          {/* Inicio */}
          <li>
            <Link
              to="/iniciodocente"
              className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <FaHome className="text-gray-600" />
              <span>Inicio</span>
            </Link>
          </li>
  
          {/* Mis clases con dropdown */}
          <li>
            <div
              className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
              onClick={toggleDropdown}
            >
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
                  <Link
                    to="/vistaclase"
                    className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <span>Clase 1</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/vistaclase"
                    className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <span>Clase 2</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/vistaclase"
                    className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <span>Clase 3</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
  
          {/* Calificaciones */}
          <li>
            <Link
              to="/calificaciones"
              className="flex items-center space-x-4 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <FaBook className="text-gray-600" />
              <span>Calificaciones</span>
            </Link>
          </li>
  
          {/* Configuración */}
          <li>
            <div
              className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
              onClick={toggleConfig}
            >
              <FaCog className="text-gray-600" />
              <span>Configuración</span>
            </div>
          </li>
  
          {/* Clases en las que estoy inscripto */}
          <div>
            <h3 className="text-[14px] text-gray-500 mt-6">Clases en las que estoy inscripto</h3>
            <div className="overflow-y-auto max-h-40 shadow-bottom">
              <Link
                to="/vistaclase"
                className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <FaBook className="text-gray-600" />
                <span>Clase 1</span>
              </Link>
              <Link
                to="/vistaclase"
                className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <FaBook className="text-gray-600" />
                <span>Clase 2</span>
              </Link>
              <Link
                to="/vistaclase"
                className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <FaBook className="text-gray-600" />
                <span>Clase 3</span>
              </Link>
              <Link
                to="/vistaclase"
                className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <FaBook className="text-gray-600" />
                <span>Clase 1</span>
              </Link>
              <Link
                to="/vistaclase"
                className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <FaBook className="text-gray-600" />
                <span>Clase 2</span>
              </Link>
              <Link
                to="/vistaclase"
                className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <FaBook className="text-gray-600" />
                <span>Clase 3</span>
              </Link>
            </div>
          </div>
  
          {/* Calendario */}
          <li className="mt-10">
            <Link
              to="/calendario"
              className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <FaCalendarAlt className="text-gray-600" />
              <span>Calendario</span>
            </Link>
          </li>
        </ul>
      </nav>
  
      {/* Modal de Configuración */}
      {isConfigOpen && <ConfigModal onClose={toggleConfig} user={user} />}
  
      {/* Cerrar sesión */}
      <footer className="p-4 border-t border-gray-300">
        <Link to="/logout" className="flex items-center text-red-400 hover:underline">
          <span>Cerrar Sesión</span>
        </Link>
      </footer>
    </div>
  );
}  

const ConfigModal = ({ onClose, user }) => {
  const [activeTab, setActiveTab] = useState('configuracion');
  const [profileImage, setProfileImage] = useState(null);

  const handleSaveImage = async () => {
    if (profileImage) {
      alert("Imagen guardada con éxito");
    } else {
      alert("Por favor, selecciona una imagen");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); 
    }
  };

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
            <input type="text" className="border rounded p-2 mb-4 w-full" value={user.user_name} readOnly />
            
            <label className="block mb-2">Apellido</label>
            <input type="text" className="border rounded p-2 mb-4 w-full" value={user.user_lastname} readOnly />
            
            <label className="block mb-2">Foto de perfil</label>
            {profileImage && (
              <div className="mb-4">
                <img src={profileImage} alt="Perfil" className="w-24 h-24 object-cover rounded-full" />
                <button
                  className="mt-2 bg-blue-500 text-white p-2 rounded-lg"
                  onClick={handleSaveImage}
                >
                  Guardar Imagen
                </button>
              </div>
            )}
            <input 
              type="file" 
              className="mb-4" 
              onChange={handleImageChange}
            />
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
          <span className="text-white text-sm">X</span>
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
