import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoClipboardOutline, IoMegaphoneOutline, IoBookOutline, IoCalendarNumberOutline, IoCopyOutline } from 'react-icons/io5';
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

  const handleCopy = (classToken) => {
    navigator.clipboard.writeText(classToken)
      .then(() => {
        Alerts.fire({
          title: '¡Copiado!',
          text: `El código de clase ${classToken} ha sido copiado al portapapeles.`,
          icon: 'success'
        });
      })
      .catch((err) => {
        Alerts.fire({
          title: 'Error',
          text: 'Hubo un problema al copiar el código.',
          icon: 'error'
        });
      });
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100 -z-0">
      {/* Sidebar */}
      {classes && user && <SidebarDocente classes={classes} user={user} />}

      {/* Main content */}
      <div className="flex flex-col w-full -z-0">
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
            <IoClipboardOutline /> <span>Tareas</span>
          </button>
          <button
            onClick={() => handleTabClick('Materiales')}
            className={`px-6 py-3 flex items-center space-x-2 ${activeTab === 'Materiales' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
          >
            <IoBookOutline /> <span>Materiales</span>
          </button>
          <button
            onClick={() => handleTabClick('Anuncios')}
            className={`px-6 py-3 flex items-center space-x-2 ${activeTab === 'Anuncios' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
          >
            <IoMegaphoneOutline /> <span>Anuncios</span>
          </button>
          <button
            onClick={() => handleTabClick('Calendario')}
            className={`px-6 py-3 flex items-center space-x-2 ${activeTab === 'Calendario' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
          >
            <IoCalendarNumberOutline /> <span>Calendario</span>
          </button>
        </div>

          {activeTab === 'Tareas' && (
            <div className="flex p-10">
                <div className="w-[20%] h-[120px] p-5 bg-white shadow-md rounded-lg mr-10">
                  <div className="text-sm sm:text-base md:text-lg flex flex-col items-start px-1">
                    <h2 className='font-bold'>Código de la clase</h2>
                    <div className='flex flex-row mt-3 items-center justify-between'>
                      <p className='text-[#118de3] font-bold'>{classes.class_token}</p>
                      <IoCopyOutline 
                        onClick={() => handleCopy(classes.class_token)} 
                        color='#333'
                        className='ml-10'
                      />
                    </div>
                  </div>
                </div>
              
                <div className="w-[80%]">
                  <h2 className="text-3xl font-bold mb-6">Tareas</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {Tarea.length === 0 ? (
                      <div className="flex flex-col justify-center items-center py-10">
                        <IoClipboardOutline className="text-6xl text-gray-400" />
                        <p className="text-xl mt-4 text-gray-600">No hay tareas disponibles</p>
                      </div>
                    ) : (
                      Tarea.map((tarea, index) => (
                        <Link to={"/vistatareadocente"} state={{classes:Class, user:userData, tarea:tarea}} key={index}>
                          <div className="bg-white p-4 shadow-md rounded-lg flex items-center hover:bg-[#fafafa]">
                          {tarea.profesorImg ? (
                            <img 
                              src={tarea.profesorImg} 
                              alt={tarea.profesorNombre || "Profesor"} 
                              className="w-12 h-12 rounded-full mr-4"
                            />
                          ) : (
                            <IoClipboardOutline size={40} color='#fff' className='mr-3 bg-blue-500 p-2 rounded-full'/>
                          )}
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
            </div>
          )}
          {activeTab === 'Materiales' && (
              <div className='flex p-10'>
              <div className="w-[20%] h-[50%] p-5  bg-white shadow-md rounded-lg mr-10">
                <div className="text-sm sm:text-base md:text-lg flex flex-col items-start px-1">
                  <h2 className='font-bold'>Código de la clase</h2>
                  <div className='flex flex-row mt-3 items-center justify-between'>
                    <p className='text-[#118de3] font-bold'>{classes.class_token}</p>
                    <IoCopyOutline 
                      onClick={() => handleCopy(classes.class_token)} 
                      color='#333'
                      className='ml-10'
                    />
                  </div>
                </div>
              </div>
              <div className='w-[80%]'>
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
                      <IoBookOutline className="text-6xl text-gray-400" />
                      <p className="text-xl mt-4 text-gray-600">No hay materiales disponibles</p>
                    </div>
                  )}
              </div>
            </div>
          )}
          {activeTab === 'Anuncios' && (
            <div className='flex p-10'>
              <div className="w-[20%] h-[50%] p-5 bg-white shadow-md rounded-lg mr-10">
                <div className="text-sm sm:text-base md:text-lg flex flex-col items-start px-1">
                  <h2 className='font-bold'>Código de la clase</h2>
                  <div className='flex flex-row mt-3 items-center justify-between'>
                    <p className='text-[#118de3] font-bold'>{classes.class_token}</p>
                    <IoCopyOutline 
                      onClick={() => handleCopy(classes.class_token)} 
                      color='#333'
                      className='ml-10'
                    />
                  </div>
                </div>
              </div>
              <div className='w-[80%]'>
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
                    <IoMegaphoneOutline/>
                    <p className="text-xl mt-4 text-gray-600">No hay anuncios disponibles</p>
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab === 'Calendario' && (
            <div className="flex p-10">
              {/* Contenedor del código de la clase */}
              <div className="w-[20%] h-[50%] p-5 bg-white shadow-md rounded-lg mr-10">
                <div className="text-sm sm:text-base md:text-lg flex flex-col items-start px-1">
                  <h2 className='font-bold'>Código de la clase</h2>
                  <div className='flex flex-row mt-3 items-center justify-between'>
                    <p className='text-[#118de3] font-bold'>{classes.class_token}</p>
                    <IoCopyOutline 
                      onClick={() => handleCopy(classes.class_token)} 
                      color='#333'
                      className='ml-10'
                    />
                  </div>
                </div>
              </div>
              
              {/* Contenedor del calendario */}
              <div className="w-[80%]">
                <h2 className="text-3xl font-bold mb-6">Calendario</h2>
                {data && data.calendario.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {data.calendario.map((fecha, index) => (
                      <li key={index}>{fecha.descripcion}: {fecha.fecha}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col justify-center items-center py-10">
                    <IoCalendarNumberOutline className="text-6xl text-gray-400" />
                    <p className="text-xl mt-4 text-gray-600">No hay eventos en el calendario</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      <AgregarClase id_class={Class.id_class} />
      </>
  );
};

export default Vistaclase;
