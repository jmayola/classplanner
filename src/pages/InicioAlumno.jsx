import React from 'react';
import Sidebar from '../components/Sidebars/SidebarAlumno'; 
import { Link } from 'react-router-dom';

const InicioAlumno = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido Principal */}
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-semibold text-gray-900">Bienvenido, Alumno</h1>

        <div>
        <div className="carousel carousel-end rounded-box">
            <div className="carousel-item">
                <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Drink" />
            </div>
            <div className="carousel-item">
                <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                alt="Drink" />
            </div>
            <div className="carousel-item">
                <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                alt="Drink" />
            </div>
            <div className="carousel-item">
                <img
                src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                alt="Drink" />
            </div>
            <div className="carousel-item">
                <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" alt="Drink" />
            </div>
            <div className="carousel-item">
                <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" alt="Drink" />
            </div>
            <div className="carousel-item">
                <img
                src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                alt="Drink" />
            </div>
            </div>
        </div>
        <p className="mt-4 text-gray-600">
          Aquí puedes acceder a tus clases, revisar tu progreso y mucho más.
        </p>

        {/* Sección de clases favoritas */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Favoritos</h2>
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-white shadow-md rounded-lg">
              <p className="text-lg text-gray-700">PI 2 SWD</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <p className="text-lg text-gray-700">Modelos y Siste.</p>
            </div>
          </div>
        </div>

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

export default InicioAlumno;
