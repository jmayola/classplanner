import React from 'react';
import { FaHome, FaFolder, FaCalendarAlt, FaArchive } from 'react-icons/fa';
import HomeIcon from '@mui/icons-material/HomeRounded';
import Calendar from '@mui/icons-material/CalendarToday';
import Assignment from '@mui/icons-material/Assignment';
import Archive from '@mui/icons-material/Archive'
import Folder from '@mui/icons-material/Folder'
import Settings from '@mui/icons-material/Settings'



const Sidebar = () => {
  return (
      <div className="w-64 h-full bg-[#F5F5F3] border-r border-gray-300 flex flex-col">
        {/* Perfil de usuario */}
        <div className="flex items-center p-4 mb-3">
          <img
            src="https://via.placeholder.com/40"
            alt="User Profile"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="text-sm font-medium">Usuaria 123456</p>
          </div>
        </div>

        {/* Categorías */}
        <ul className="px-4">
          <li className="flex items-center mb-4 text-sm text-gray-600">
            <HomeIcon className="text-gray-400 w-4 h-4 mr-3" />
            Inicio
          </li>
          <li className="flex items-center mb-4 text-sm text-gray-600">
            <Folder className="text-gray-400 w-4 h-4 mr-3" />
            Mis trabajos
          </li>
          <li className="flex items-center mb-4 text-sm text-gray-600">
            <Assignment className="text-gray-400 w-4 h-4 mr-3" />
            Mis notas
          </li>
        </ul>

        <hr className="border-t border-gray-200 my-2 mt-2 mb-2" />  {/* Línea divisora */}
        
        <div className="overflow-y-auto max-h-64">
  <div className="px-4 mb-2 text-[14px] text-gray-500 mt-5">
    Favoritos
  </div>
  <ul className="px-4">
    <li className="flex items-center mb-4 text-sm text-gray-600">
      <Assignment className="text-gray-400 w-4 h-4 mr-3" />
      P.I.S.W.D
    </li>
    <li className="flex items-center mb-4 text-sm text-gray-600">
      <Assignment className="text-gray-400 w-4 h-4 mr-3" />
      Modelos y Siste.
    </li>
  </ul>

  {/* Clases */}
  <div className="px-4 mb-2 text-[14px] text-gray-500 mt-5">
    Clases
  </div>
  <ul className="px-4">
    <li className="flex items-center mb-4 text-sm text-gray-600">
      <Assignment className="text-gray-400 w-4 h-4 mr-3" />
      Clase 1
    </li>
    <li className="flex items-center mb-4 text-sm text-gray-600">
      <Assignment className="text-gray-400 w-4 h-4 mr-3" />
      Clase 2
    </li>
    <li className="flex items-center mb-4 text-sm text-gray-600">
      <Assignment className="text-gray-400 w-4 h-4 mr-3" />
      Clase 3
    </li>
  </ul>
</div>


        <hr className="border-t border-gray-200 mt-2 mb-5" />  {/* Línea divisora */}
        
        <ul className="px-4">
          <li className="flex items-center mb-4 text-sm font-semibold text-gray-700">
            <Calendar className="text-gray-400 w-4 h-4 mr-3" />
            Calendario
          </li>
          <li className="flex items-center mb-4 text-sm font-semibold text-gray-700">
            <Archive className="text-gray-400 w-4 h-4 mr-3" />
            Clases archivadas
          </li>
          <li className="flex items-center mb-4 text-sm font-semibold text-gray-700">
            <Settings className="text-gray-400 w-4 h-4 mr-3" />
            Ajustes
          </li>
        </ul>
      </div>
  );
};

export default Sidebar;
