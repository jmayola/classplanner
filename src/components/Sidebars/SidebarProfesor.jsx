import React, { useState, useEffect } from 'react';
import { FaPalette, FaGlobe, FaCalendarAlt, FaChalkboardTeacher, FaBook, FaEnvelope, FaUser, FaHome, FaCaretDown, FaCaretUp, FaCog, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Alerts from 'sweetalert2';
import ConfigModal from "../Configuration"
const SidebarProfesor = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [user, setUser] = useState({ user_name: '', user_lastname: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/user',{withCredentials:true})
      .then(response => {
        if (response.data) {
          let user_type = response.data.user_type
          if( user_type == "alumno" || user_type == "" ){
            Alerts.fire({
              title: 'Error',
              text: `No tienes acceso a este apartado`,
              icon: 'error',
              confirmButtonText: 'Autenticar',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location = "/login"
              }
            })
          }else{
            setUser(response.data);
            setError(null);
          }
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
            {user.user_photo ? <img className='w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center' src={`http://localhost:3000/${user.user_photo}`} alt="" /> : <FaUser className="text-gray-600 text-2xl" />}
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



export default SidebarProfesor;
