import React, { useState, useEffect } from 'react';
import { FaTimes, FaUser, FaCog, FaGlobe, FaPalette  } from 'react-icons/fa';
import { IoSettingsOutline, IoPersonOutline, IoGlobeOutline, IoColorPaletteOutline } from 'react-icons/io5';
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
            <h3 className="mb-2 text-[#252525]">Configuración de la cuenta</h3>
            <div className='border-t border-gray-200 w-[100%] my-4 m-auto'/>
            <label className="block mb-2">Cambiar contraseña</label>
            <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} className="border rounded-[40px] px-4 py-2 mb-4 w-full" placeholder="Nueva contraseña" />

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
            <h3 className="mb-2 text-[#252525]">Información del perfil</h3>
            <div className='border-t border-gray-200 w-[100%] my-4 m-auto'/>
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
            

            <div className='border-t border-gray-200 w-[100%] my-4 m-auto'/>

            <div className="mb-6 w-[25%]">
              <Link to="/logout" className=" text-center flex text-white px-5 py-2 bg-[#ca1c1c] rounded-[40px] hover:bg-[#a81616]">
                <span >Cerrar Sesión</span>
              </Link>
            </div>
          </div>
        );
      case 'idioma':
        return (
          <div>
            <h3 className="mb-2 text-[#252525]">Idioma y región</h3>
            <div className='border-t border-gray-200 w-[100%] my-4 m-auto'/>
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
            <h3 className="mb-2 text-[#252525]">Tema visual</h3>
            <div className='border-t border-gray-200 w-[100%] my-4 m-auto'/>
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
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]`}>
        <div className={`relative bg-[#fff] flex flex-col rounded-shadow-lg max-w-3xl md:w-full`}>
          <div
            onClick={onClose}
            className="absolute top-4 right-4 w-4 h-4 bg-[#ca1c1c] rounded-full flex items-center justify-center cursor-pointer"
          >
          </div>

          {/* Sidebar */}
          <div className={`w-full md:flex md:w-auto md:border-r md:bg-white`}>
            <div className={`md:w-[25%] p-6 border-b md:border-b-none md:border-r`}>
              
              <div className="flex items-center mb-6 px-3">
                {user.user_photo ? 
                  (<img src={`http://localhost:3000/${user.user_photo}`} 
                        className="w-8 h-8 rounded-full mr-4" alt="profile" />) : 
                  (<FaUser className="w-8 h-8 mr-4" />)}
                <p className="text-base text-[#333] font-[20px]">{user.user_name} {user.user_lastname}</p>
              </div>

              {/* Sidebar Options */}
              <ul className="space-y-2">
                {['configuracion', 'perfil', 'idioma', 'tema'].map(tab => (
                  <li key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center space-x-2 cursor-pointer text-gray-900 hover:bg-[#f5f5f5] hover:rounded-[15px] w-full h-[40px] px-3 pr-3 ${activeTab === tab ? 'text-blue-600' : ''} transition-all`}>
                    {tab === 'configuracion' && <IoSettingsOutline size={28} color='#222'/>}
                    {tab === 'perfil' && <IoPersonOutline size={20} color='#222'/>}
                    {tab === 'idioma' && <IoGlobeOutline size={20} color='#222'/>}
                    {tab === 'tema' && <IoColorPaletteOutline size={20} color='#222'/>}
                    <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Content Area */}
            <div className={`w-full md:w-[75%] p-[20px]`}>
              <h2 className={`text-xl mb-[10px] font-bold`}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>

              {renderContent()}
              
            </div>

          </div>

        </div>
      </div>
    </>,
    document.body 
  );
}
