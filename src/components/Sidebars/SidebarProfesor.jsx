import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline, IoPerson , IoSettingsOutline, IoBookOutline, IoCloseOutline, IoMenuOutline } from 'react-icons/io5';
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
        <IoMenuOutline size={24} />
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-0 bg-[#F7F7FF] shadow-md z-50 transition-transform h-screen ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:w-64`}>
        <div className="p-6">
          <div className="flex items-center space-x-4 flex-row">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              {userData.user_photo ? (
                <img src={`http://localhost:3000/${userData.user_photo}`} className="w-12 h-12 bg-gray-300 rounded-full" alt="image_profile" />
              ) : (
                <IoPerson size={24} />
              )}
            </div>
            
            <div>
              <p className="text-[#333] font-semibold">{userData.user_name} {userData.user_lastname}</p>
            </div>

          <button
            onClick={toggleSidebar} // This will close the sidebar
            className="md:hidden w-8 h-8 bg-[#ca1c1c] rounded-full flex items-center justify-center cursor-pointer"
          >
            <IoCloseOutline color='#fff' size={16} />
          </button>
          </div>
        </div>

        <nav className="px-6">
          <Link to="/iniciodocente" className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <IoHomeOutline className="text-gray-600" />
            <span>Inicio</span>
          </Link>
          <div
            className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
            onClick={toggleConfig}
          >
            <IoSettingsOutline className="text-gray-600" />
            <span>Configuración</span>
          </div>

          <div>
            <h3 className="text-[14px] text-gray-500 mt-6">Clases en las que estoy inscripto</h3>
            <div className="overflow-y-auto max-h-40 mb-10">
              {classes && classes.map((clase, index) => (
                <Link key={index} to={`/vistaclasedocente?clase=${clase.class_name}`} state={{ classes: clase, user: userData, id: clase.class_token }} className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <IoBookOutline className="text-gray-600" />
                  <span>{clase.class_name}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {isConfigOpen && (
          <ConfigModal onClose={toggleConfig} user={user} />
        )}

        <footer className="fixed bottom-0 left-0 right-0">
          <div className="border-t border-gray-300 my-4"></div>
          <div className="px-10 flex justify-center mb-6">
            <img
              src="/ClassPlanner10.png"
              alt="Class Planner Logo"
              className="w-32 h-auto"
            />
          </div>
        </footer>
      </div>

      {isSidebarOpen && (
        <>
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black opacity-50 z-40"
          />
          <div 
            className={`fixed inset-y-0 left-[256px] w-full bg-[#F7F7FF] transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-[256px]' : 'translate-x-full'} md:hidden`}
          >
          </div>
        </>
      )}
    </div>
  );
};

export default SidebarDocente;