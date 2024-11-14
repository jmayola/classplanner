import React, { useState } from 'react';
import { FaBook, FaClipboardList, FaBullhorn, FaChalkboardTeacher } from 'react-icons/fa';
import Sidebar from '../../components/Sidebars/SidebarAlumno';

const Vistaclase = () => {
  const [activeTab, setActiveTab] = useState('Tareas');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
            <h3 className="text-2x1 font-semibold">7mo 2da</h3>
            <p className="text-lg">Juan Pérez</p>
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
                <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
                  <img 
                    src="https://via.placeholder.com/50" 
                    alt="Profesor Juan Pérez" 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-[16px]">Usuario publicó una nueva tarea: Tarea 1 - Investigación</h3>
                    <p className="text-gray-600 text-[14px]">Fecha de entrega: 20 de septiembre, 2024</p>
                    <a href="#tarea1" className="text-blue-500 hover:underline mt-2 block">Ver detalles</a>
                  </div>
                </div>

                <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
                  <img 
                    src="https://via.placeholder.com/50" 
                    alt="Profesor Juan Pérez" 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">Tarea 2: Ensayo</h3>
                    <p className="text-gray-600">Fecha de entrega: 25 de septiembre, 2024</p>
                    <a href="#tarea2" className="text-blue-500 hover:underline mt-2 block">Ver detalles</a>
                  </div>
                </div>

                <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
                  <img 
                    src="https://via.placeholder.com/50" 
                    alt="Profesor Juan Pérez" 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">Tarea 3: Presentación</h3>
                    <p className="text-gray-600">Fecha de entrega: 30 de septiembre, 2024</p>
                    <a href="#tarea3" className="text-blue-500 hover:underline mt-2 block">Ver detalles</a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Materiales' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Materiales</h2>
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
            </div>
          
          
          )}

          {activeTab === 'Anuncios' && (
           <div>
              <h2 className="text-3xl font-bold mb-6">Anuncios</h2>
              <div className="bg-white p-4 shadow-md rounded-lg flex flex-col space-y-4">
                <div className='flex flex-row items-center space-x-2'>
                  <img src="https://via.placeholder.com/50" alt="Imagen de perfil" className="w-12 h-12 rounded-full" />
                  <div className='flex flex-col text-left'>
                    <p>Usuario</p>
                    <p className="text-gray-700 text-[14px]">15 sept</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-left items-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, non nihil. Dolorem distinctio nostrum 
                    similique esse recusandae hic reprehenderit, 
                    iure, at voluptatem deserunt, consequuntur voluptatum earum cumque sapiente eos eaque!</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Calendario' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Calendario</h2>
              <p>Próximas fechas importantes:</p>
              <ul className="list-disc list-inside">
                <li>Entrega de la Tarea 1: 20 de septiembre, 2024</li>
                <li>Entrega de la Tarea 2: 25 de septiembre, 2024</li>
                <li>Examen parcial: 1 de octubre, 2024</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vistaclase;
