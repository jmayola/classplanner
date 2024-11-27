import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaBullhorn, FaCalendarAlt, FaBook } from 'react-icons/fa'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import AgregarClase from "../../components/AgregarClase"
import withReactContent from 'sweetalert2-react-content';
import { Link, useLocation} from 'react-router-dom';
import SidebarDocente from '../../components/Sidebars/SidebarProfesor';
import BannerClase from '../../components/BannerClase';

const Alerts = withReactContent(Swal);

const Vistaclase = () => {
  let {classes, user, id} = useLocation().state;
  const [activeTab, setActiveTab] = useState('Tareas');
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState({ name: '', lastname: '' });
  const [Class, setClass] = useState([]);
  const [Tarea, setTarea] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setUserData(user);
    setClass(classes);
    getTareas();
  }, [classes, user, id]);

  const getTareas = () => {
    axios.get("http://localhost:3000/tasks", { withCredentials: true })
      .then((res) => {
        const data = res.data.filter((val) => val.id_class === classes.id_class);
        setTarea(data);
      })
  };

  return (
    <div className="flex h-screen bg-gray-100 -z-0">
      {/* Sidebar */}
      {classes && user && <SidebarDocente classes={classes} user={user} />}

      {/* Main content */}
      <div className="flex flex-col w-full -z-0">
        {/* Banner similar a Google Classroom */}
        {Class && (
          <BannerClase
            className={Class.class_name}
            classCurso={Class.class_curso}
            classColor={Class.class_color}
            classToken={Class.class_token}
            userName={userData.user_name}
            userLastname={userData.user_lastname}
          />
        )}

        {/* Tabs */}
        <div className="flex justify-center bg-white shadow-md">
          <button
            onClick={() => handleTabClick('Tareas')}
            className={`px-6 py-3 flex items-center space-x-2 ${activeTab === 'Tareas' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
          >
            <FaClipboardList /> <span>Tareas</span>
          </button>
          <button
            onClick={() => handleTabClick('Materiales')}
            className={`px-6 py-3 flex items-center space-x-2 ${activeTab === 'Materiales' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
          >
            <FaBook /> <span>Materiales</span>
          </button>
          <button
            onClick={() => handleTabClick('Anuncios')}
            className={`px-6 py-3 flex items-center space-x-2 ${activeTab === 'Anuncios' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
          >
            <FaBullhorn /> <span>Anuncios</span>
          </button>
          <button
            onClick={() => handleTabClick('Calendario')}
            className={`px-6 py-3 flex items-center space-x-2 ${activeTab === 'Calendario' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
          >
            <FaCalendarAlt /> <span>Calendario</span>
          </button>
        </div>

        {/* Main content based on active tab with scrollbar */}
        <div className="flex-1 p-8 overflow-y-auto max-h-[calc(100vh-10rem)]">
          {activeTab === 'Tareas' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Tareas</h2>
              <div className="grid grid-cols-1 gap-4">
                {Tarea.length === 0 ? (
                  <div className="flex flex-col justify-center items-center py-10">
                    <FaClipboardList className="text-6xl text-gray-400" />
                    <p className="text-xl mt-4 text-gray-600">No hay tareas disponibles</p>
                  </div>
                ) : (
                  Tarea.map((tarea, index) => (
                    <Link to={"/vistatareadocente"} state={{classes:Class, user:userData, tarea:tarea}} key={index}>
                      <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
                        <img 
                          src={tarea.profesorImg || "https://via.placeholder.com/50"} 
                          alt={tarea.profesorNombre} 
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h3 className="text-[16px]">{tarea.title}</h3>
                          <p className="text-gray-600 text-[14px]">Fecha de entrega: {tarea.deliver_until}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}
          {activeTab === 'Materiales' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Materiales</h2>
              {data && data.materiales.length > 0 ? (
                <ul className="list-disc list-inside">
                  {data.materiales.map((material, index) => (
                    <li key={index}>
                      {material.nombre}: 
                      <a href={material.link} className="text-blue-500 hover:underline">Descargar</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col justify-center items-center py-10">
                  <FaBook className="text-6xl text-gray-400" />
                  <p className="text-xl mt-4 text-gray-600">No hay materiales disponibles</p>
                </div>
              )}
            </div>
          )}
          {activeTab === 'Anuncios' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Anuncios</h2>
              {data && data.anuncios.length > 0 ? (
                <div className="bg-white p-4 shadow-md rounded-lg flex flex-col space-y-4">
                  {data.anuncios.map((anuncio, index) => (
                    <div key={index} className='flex flex-row items-center space-x-2'>
                      <img src={anuncio.img || "https://via.placeholder.com/50"} alt="Imagen de perfil" className="w-12 h-12 rounded-full" />
                      <div className='flex flex-col text-left'>
                        <p>{anuncio.usuario}</p>
                        <p className="text-gray-700 text-[14px]">{anuncio.fecha}</p>
                      </div>
                      <p className="text-gray-600">{anuncio.mensaje}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center py-10">
                  <FaBullhorn className="text-6xl text-gray-400" />
                  <p className="text-xl mt-4 text-gray-600">No hay anuncios disponibles</p>
                </div>
              )}
            </div>
          )}
          {activeTab === 'Calendario' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Calendario</h2>
              {data && data.calendario.length > 0 ? (
                <ul className="list-disc list-inside">
                  {data.calendario.map((fecha, index) => (
                    <li key={index}>{fecha.descripcion}: {fecha.fecha}</li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col justify-center items-center py-10">
                  <FaCalendarAlt className="text-6xl text-gray-400" />
                  <p className="text-xl mt-4 text-gray-600">No hay eventos en el calendario</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <AgregarClase id_class={Class.id_class} />
    </div>
  );
};

export default Vistaclase;
