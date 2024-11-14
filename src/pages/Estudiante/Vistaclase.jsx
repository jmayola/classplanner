import React, { useState, useEffect } from 'react';
import { FaBook, FaClipboardList, FaBullhorn, FaChalkboardTeacher } from 'react-icons/fa';
import Sidebar from '../../components/Sidebars/SidebarAlumno';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Alerts = withReactContent(Swal);

const Vistaclase = () => {
  const [activeTab, setActiveTab] = useState('Tareas');
  const [data, setData] = useState(null);


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/vistaclase');
      if (response.status === 200) {
        setData(response.data);
      } else {
        Alerts.fire({
          title: <p>Error al cargar los datos</p>,
          text: "No se pudieron obtener los datos correctamente. Código: " + response.status,
          icon: "error",
        });
      }
    } catch (error) {
      if (error.response) {
        Alerts.fire({
          title: <p>Error del servidor</p>,
          text: "Código de error: " + error.response.status + ". " + error.response.data.message,
          icon: "error",
        });
      } else if (error.request) {
        Alerts.fire({
          title: <p>Error de conexión</p>,
          text: "No se recibió respuesta del servidor. Inténtelo más tarde.",
          icon: "error",
        });
      } else {
        Alerts.fire({
          title: <p>Error inesperado</p>,
          text: "Se produjo un error: " + error.message,
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col w-full">
        {/* Banner similar a Google Classroom */}
        <div className="relative h-40 bg-blue-600">
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-4xl font-bold">Clase 1</h1>
            <h3 className="text-2xl font-semibold">7mo 2da</h3>
            <p className="text-lg">{useralumno} {useralumnopassword}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center bg-white shadow-md">
          <button
            onClick={() => handleTabClick('Tareas')}
            className={`px-6 py-3 ${activeTab === 'Tareas' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
          >
            Tareas
          </button>
          <button
            onClick={() => handleTabClick('Materiales')}
            className={`px-6 py-3 ${activeTab === 'Materiales' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
          >
            Materiales
          </button>
          <button
            onClick={() => handleTabClick('Anuncios')}
            className={`px-6 py-3 ${activeTab === 'Anuncios' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
          >
            Anuncios
          </button>
          <button
            onClick={() => handleTabClick('Calendario')}
            className={`px-6 py-3 ${activeTab === 'Calendario' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
          >
            Calendario
          </button>
        </div>

        {/* Main content based on active tab with scrollbar */}
        <div className="flex-1 p-8 overflow-y-auto max-h-[calc(100vh-10rem)]">
          {activeTab === 'Tareas' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Tareas</h2>
              <div className="grid grid-cols-1 gap-4">
                {/*  mapear los datos de 'data' que se ha obtenido */}
                {data && data.tareas.map((tarea, index) => (
                  <div key={index} className="bg-white p-4 shadow-md rounded-lg flex items-center">
                    <img 
                      src={tarea.profesorImg || "https://via.placeholder.com/50"} 
                      alt={tarea.profesorNombre} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="text-[16px]">{tarea.titulo}</h3>
                      <p className="text-gray-600 text-[14px]">Fecha de entrega: {tarea.fechaEntrega}</p>
                      <a href={`#${tarea.id}`} className="text-blue-500 hover:underline mt-2 block">Ver detalles</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Materiales' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Materiales</h2>
<<<<<<< HEAD
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white p-4 shadow-md rounded-t-[20px]">
                  <div className="bg-[#fff] p-4 border-b border-gray-300 mb-5">
                    <h3 className="text-black text-[16px]">
                      20 de septiembre, 2024&nbsp;&nbsp;•&nbsp;&nbsp;Tarea 1 - Investigación
                    </h3>
                  </div>
                  <div className="flex flex-row max-w-full">
                      <a href="#" className="text-blue-500 hover:underline mr-10">MaterialdeEstudio.pdf</a>
                      <a href="#" className="text-blue-500 hover:underline mr-10">MaterialdeEstudio.pdf</a>
                      <a href="#" className="text-blue-500 hover:underline mr-10">MaterialdeEstudio.pdf</a>
                      <a href="#" className="text-blue-500 hover:underline mr-10">MaterialdeEstudio.pdf</a>
                    </div>
                </div>
                <div className="border-t border-gray-300 my-4 w-full"></div>
              </div>
=======
              <ul className="list-disc list-inside">
                {data && data.materiales.map((material, index) => (
                  <li key={index}>{material.nombre}: <a href={material.link} className="text-blue-500 hover:underline">Descargar</a></li>
                ))}
              </ul>
>>>>>>> refs/remotes/origin/master
            </div>
          
          
          )}

          {activeTab === 'Anuncios' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Anuncios</h2>
              <div className="bg-white p-4 shadow-md rounded-lg flex flex-col space-y-4">
                {data && data.anuncios.map((anuncio, index) => (
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
            </div>
          )}

          {activeTab === 'Calendario' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Calendario</h2>
              <p>Próximas fechas importantes:</p>
              <ul className="list-disc list-inside">
                {data && data.calendario.map((fecha, index) => (
                  <li key={index}>{fecha.descripcion}: {fecha.fecha}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vistaclase;
