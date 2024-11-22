import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaFileAlt, FaStickyNote, FaCalendarAlt, FaBook, FaCog, FaBars } from 'react-icons/fa';
import axios from 'axios';
import ConfigModal from '../Configuration';
import { useClasses } from '../../../contexts/Classes';

const SidebarDocente = () => {
  const { classes, user } = useClasses();
  const [userData, setUserData] = useState(user);
  const [Classes, setClasses] = useState(classes);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  useEffect(() => {
    setUserData(user);
    setClasses(classes);
  }, [classes, user]);

  const toggleConfig = () => {
    setIsConfigOpen(!isConfigOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="relative">
      {/* Hamburger Menu Icon for Mobile */}
      <button onClick={toggleSidebar} className="md:hidden p-4">
        <FaBars className="text-gray-600 text-2xl" />
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-0 bg-[#F7F7FF] shadow-md z-50 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:w-64`}>
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              {userData.user_photo ? (
                <img src={`http://localhost:3000/${userData.user_photo}`} className="w-12 h-12 bg-gray-300 rounded-full" alt="image_profile" />
              ) : (
                <FaUser className="text-gray-600 text-2xl" />
              )}
            </div>
            <div>
              <p className="text-gray-900 font-semibold">{userData.user_name} {userData.user_lastname}</p>
            </div>
          </div>
        </div>

        <nav className="px-6">
          <Link to="/iniciodocente" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FaHome className="text-gray-600" />
            <span>Inicio</span>
          </Link>
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
                <Link key={index} to={`/vistaclasedocente?clase=${clase.class_name}`} state={{ classes: clase, user: userData, id: clase.class_token }} className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
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

        {isConfigOpen && (
          <ConfigModal onClose={toggleConfig} user={user} />
        )}

        {/* Cerrar sesión */}
        <footer className="p-4 border-t border-gray-300">
          <Link to="/logout" className="flex items-center text-red-400 hover:underline">
            <span>Cerrar Sesión</span>
          </Link>
        </footer>
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {isSidebarOpen && (
        <>
          {/* Overlay for mobile view */}
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black opacity-50 z-40"
          />
          
          {/* Full-screen sidebar for larger screens */}
          <div 
            className={`fixed inset-y-0 left-[256px] w-full bg-[#F7F7FF] transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-[256px]' : 'translate-x-full'} md:hidden`}
          >
            {/* Content of the sidebar can also be repeated here if needed */}
            {/* You can include navigation links or any other components here */}
          </div>
        </>
      )}
    </div>
  );
};

export default SidebarDocente;
