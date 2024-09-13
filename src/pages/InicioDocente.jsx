import React from 'react';
import SidebarProfesor from '../components/Sidebars/SidebarProfesor'; 

const InicioDocente = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarProfesor />

      {/* Contenido Principal */}
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-semibold text-gray-900">Bienvenido, Profesor</h1>
        <p className="mt-4 text-gray-600">
          Acá poes administrar tus clases
        </p>

        {/* Sección de Clases */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Clases</h2>
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-white shadow-md rounded-lg">
              <p className="text-lg text-gray-700">Clase 1</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <p className="text-lg text-gray-700">Clase 2</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <p className="text-lg text-gray-700">Clase 3</p>
            </div>
          </div>
        </div>

        {/* Sección de Calendario */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Calendario</h2>
          <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
            <p className="text-lg text-gray-700">Ver calendario completo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioDocente;
