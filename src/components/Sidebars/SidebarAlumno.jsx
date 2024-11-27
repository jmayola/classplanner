import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaBook } from 'react-icons/fa';
import ConfigModal from '../Configuration';
import { useClasses } from '../../../contexts/Classes';

const SidebarAlumno = () => {
  const { classes, user } = useClasses();
  const [userData, setUserData] = useState(user);
  const [Classes, setClasses] = useState(classes);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  useEffect(() => {
    setUserData(user);
    setClasses(classes);
  }, [classes, user]);

  const toggleConfig = () => {
    setIsConfigOpen(!isConfigOpen);
  };

  return (
    <div className="w-64 bg-[#F7F7FF] shadow-md flex flex-col justify-between h-screen">
      <div className="flex flex-col flex-grow">
        {/* User Info Section */}
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              {userData.user_photo ? (
                <img
                  src={`http://localhost:3000/${userData.user_photo}`}
                  className="w-12 h-12 bg-gray-300 rounded-full"
                  alt="image_profile"
                />
              ) : (
                <FaUser className="text-gray-600 text-2xl" />
              )}
            </div>
            <div>
              <p className="text-gray-900 font-semibold">
                {userData.user_name} {userData.user_lastname}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-6 flex-grow">
          <Link
            to="/inicioalumno"
            className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
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

          <div className="mt-6">
            <h3 className="text-[14px] text-gray-500">Clases en las que estoy inscripto</h3>
            <div className="overflow-y-auto max-h-40">
              {classes && classes.length > 0 ? (
                classes.map((clase, index) => (
                  <Link
                    key={index}
                    to={`/vistaclase?clase=${clase.class_name}`}
                    state={{ classes: clase, user: userData, id: clase.class_token }}
                    className="flex items-center space-x-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <FaBook className="text-gray-600" />
                    <span>{clase.class_name}</span>
                  </Link>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px] text-gray-600 text-sm">
                  <p>No estás inscrito en ninguna clase. ¡Anímate a inscribirte!</p>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Configuration Modal */}
        {isConfigOpen && <ConfigModal onClose={toggleConfig} user={user} />}
      </div>

      {/* Divider for the Logout section */}
      <div className="border-t border-gray-300 my-4"></div>
      {/* Logo at the bottom */}
      <div className="px-10 flex justify-center mb-6">
        <img
          src="/ClassPlanner10.png"
          alt="Class Planner Logo"
          className="w-32 h-auto"
        />
      </div>
    </div>
  );
};

export default SidebarAlumno;
