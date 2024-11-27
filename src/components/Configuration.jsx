import React, { useState, useEffect } from 'react';
import { FaTimes, FaUser, FaCog, FaGlobe, FaPalette  } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
export default function ConfigModal({ onClose, user }) {
  const [activeTab, setActiveTab] = useState('configuracion');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageExpo, setProfileImageExpo] = useState(null);
  const [Password, setPassword] = useState(null);

  const handleSaveImage = async () => {
    if (profileImageExpo) {
      const formData = new FormData();
      formData.append("user_photo", profileImageExpo);

      try {
        const response = await axios.put(
          "http://localhost:3000/user",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        alert("Imagen guardada con éxito");
        window.location.reload();
      } catch (error) {
        console.error(error);
        alert("Hubo un error al guardar la imagen");
      }
    } else {
      alert("Por favor, selecciona una imagen");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImageExpo(file);
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'configuracion':
        return (
          <div className='z-10 sticky'>
            <h3 className="mb-2 font-semibold">Configuración de la cuenta</h3>
            <label className="block mb-2">Cambiar contraseña</label>
            <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} className="border rounded p-2 mb-4 w-full" placeholder="Nueva contraseña" />

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
                 {/* Logout Button */}
      <div className="px-6 flex justify-center mb-6">
        <Link to="/logout" className="flex items-center text-red-400 hover:underline">
          <span>Cerrar Sesión</span>
        </Link>
      </div>
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

  return ReactDOM.createPortal(
    <>
      {/* Overlay for the modal */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]`}>
        {/* Modal Container */}
        <div className={`relative bg-white flex flex-col rounded-lg shadow-lg w-full max-w-lg md:w-full`}>
          
          {/* Close Button */}
          <div
            onClick={onClose}
            className="absolute top-4 right-4 w-6 h-6 bg-[#ca1c1c] rounded-full flex items-center justify-center cursor-pointer"
          >
            <FaTimes color='#fff' size={12} />
          </div>

          {/* Sidebar for configuration */}
          <div className={`w-full md:flex md:w-auto md:border-r md:bg-gray-100`}>
            {/* Sidebar content */}
            {/** Sidebar Header */}
            <div className={`md:w-[25%] p-6 border-b md:border-b-none md:border-r`}>
              {/* Account Header */}
              <h1 className='text-gray-500 mt-0 mb-2 font-semibold text-[16px]'>Cuenta</h1>

              {/* Profile Image and Username */}
              <div className="flex items-center mb-6">
                {user.user_photo ? 
                  (<img src={`http://localhost:3000/${user.user_photo}`} 
                        className="w-8 h-8 rounded-full mr-4" alt="profile" />) : 
                  (<FaUser className="w-8 h-8 rounded-full mr-4" />)}
                <p className="text-base">{user.user_name} {user.user_lastname}</p>
              </div>

              {/* Sidebar Options */}
              <ul className="space-y-2">
                {['configuracion', 'perfil', 'idioma', 'tema'].map(tab => (
                  <li key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center space-x-2 cursor-pointer text-gray-700 hover:bg-gray-300 hover:rounded-lg w-full h-[40px] pl-[10px] ${activeTab === tab ? 'text-blue-600' : ''} transition-all`}>
                    {tab === 'configuracion' && (<FaCog />)}
                    {tab === 'perfil' && (<FaUser />)}
                    {tab === 'idioma' && (<FaGlobe />)}
                    {tab === 'tema' && (<FaPalette />)}
                    <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span> {/* Capitalize first letter */}
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Content Area */}
            <div className={`w-full md:w-[75%] p-[20px]`}>
              {/* Dynamic Content Header */}
              <h2 className={`text-xl font-semibold mb-[10px]`}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>

              {/* Render Dynamic Content */}
              {renderContent()}
              
            </div>

          </div>

        </div>
      </div>
    </>,
    document.body // Aquí es donde se renderiza el portal
  );
}
