import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFileAlt, FaStickyNote, FaCalendarAlt, FaStar, FaBook } from 'react-icons/fa';

const SidebarAlumno = () => {
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
        <Link to="/" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          <FaHome className="text-gray-600" />
          <span>Inicio</span>
        </Link>
        <Link to="/mis-trabajos" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          <FaFileAlt className="text-gray-600" />
          <span>Mis trabajos</span>
        </Link>
        <Link to="/mis-notas" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          <FaStickyNote className="text-gray-600" />
          <span>Mis notas</span>
        </Link>
        
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500">Favoritos</h3>
          <Link to="/favoritos/pi2swd" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FaStar className="text-yellow-500" />
            <span>PISWD</span>
          </Link>
          <Link to="/favoritos/modelos" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FaStar className="text-yellow-500" />
            <span>Modelos y Sistemas</span>
          </Link>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500">Clases</h3>
          <Link to="/clases/clase1" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FaBook className="text-gray-600" />
            <span>Clase 1</span>
          </Link>
          <Link to="/clases/clase2" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FaBook className="text-gray-600" />
            <span>Clase 2</span>
          </Link>
          <Link to="/clases/clase3" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FaBook className="text-gray-600" />
            <span>Clase 3</span>
          </Link>
        </div>

        <div className="mt-6">
          <Link to="/calendario" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FaCalendarAlt className="text-gray-600" />
            <span>Calendario</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default SidebarAlumno;
