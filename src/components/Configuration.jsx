import React, { useState, useEffect } from 'react';
import { FaTimes, FaHome, FaUser, FaFileAlt, FaStickyNote, FaCalendarAlt, FaStar, FaBook, FaCog, FaGlobe, FaPalette } from 'react-icons/fa';
import axios from 'axios';

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
          <div>
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
          onClick={onClose} // Llama a la función onClose al hacer clic
          className="absolute top-4 right-4 w-4 h-4 bg-[#ca1c1c] rounded-full flex items-center justify-center cursor-pointer"
        >
          <FaTimes color='#fff' size={10} />
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
            {activeTab === 'tema' && 'Tema visual'}
          </h2>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
