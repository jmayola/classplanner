import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaFileAlt, FaStickyNote, FaCalendarAlt, FaStar, FaBook } from 'react-icons/fa';

const SidebarAlumno = () => {
  const useralumno = localStorage.getItem("user_name");
  const useralumnopassword = localStorage.getItem("user_lastname");
  return (
    <div className="w-64 bg-[#F7F7FF] shadow-md">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <FaUser className="text-gray-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-900 font-semibold">{useralumno} {useralumnopassword}</p>
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

        <div>
            <h3 className="text-[14px] text-gray-500 mt-6">Clases en las que estoy inscripto</h3>
            <div className="overflow-y-auto max-h-40">
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
