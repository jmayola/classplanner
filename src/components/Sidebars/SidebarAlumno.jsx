import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaFileAlt, FaStickyNote, FaCalendarAlt, FaBook, FaCog } from 'react-icons/fa';
import axios from 'axios';
import ConfigModal from '../Configuration';
import { useClasses } from '../../../contexts/Classes';

const SidebarAlumno = () => {
  const {classes,user } = useClasses()
  const [userData, setUserData] = useState(user)
  const [Classes, setClasses] = useState(classes)
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  useEffect(() => {
    setUserData(user)
    setClasses(classes)
  }, [classes,user])
  const toggleConfig = () => {
    setIsConfigOpen(!isConfigOpen);
  };

  return (
    <div className="w-64 bg-[#F7F7FF] shadow-md">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            {userData.user_photo ? <img src={`http://localhost:3000/${userData.user_photo}`} className="w-12 h-12 bg-gray-300 rounded-full" alt="image_profile" /> : <FaUser className="text-gray-600 text-2xl" />}
          </div>
          <div>
            <p className="text-gray-900 font-semibold">{userData.user_name} {userData.user_lastname}</p>
          </div>
        </div>
      </div>

      <nav className="px-6">
        <Link to="/inicioalumno" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          <FaHome className="text-gray-600" />
          <span>Inicio</span>
        </Link>
        <Link to="/mis-trabajos" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          <FaFileAlt className="text-gray-600" />
          <span>Mis trabajos</span>
        </Link>
        <Link to="/misnotas" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          <FaStickyNote className="text-gray-600" />
          <span>Mis notas</span>
        </Link>
        {/* //configuracion */}
            <div
              className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
              onClick={toggleConfig}
            >
              <FaCog className="text-gray-600" />
              <span>Configuración</span>
            </div>
        <div>
            <h3 className="text-[14px] text-gray-500 mt-6">Clases en las que estoy inscripto</h3>
            <div className="overflow-y-auto max-h-40">
              {classes && classes.map((clase, index) => (
                <Link key={index} to={"/vistaclase?clase="+clase.class_name} state={{classes:clase, user:userData, id:clase.class_token}} className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <FaBook className="text-gray-600" />
                <span>{clase.class_name}</span>
                </Link>
              ))}
            </div>
          </div>


        <div className="mt-6">
          <Link to="/calendario" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FaCalendarAlt className="text-gray-600" />
            <span>Calendario</span>
          </Link>
        </div>
      </nav>
      {isConfigOpen && <ConfigModal onClose={toggleConfig} user={user} />}
  
      {/* Cerrar sesión */}
      <footer className="p-4 border-t border-gray-300">
        <Link to="/logout" className="flex items-center text-red-400 hover:underline">
          <span>Cerrar Sesión</span>
        </Link>
      </footer>
    </div>
  );
};

export default SidebarAlumno;
