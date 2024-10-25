import React, { useEffect, useState } from 'react';
import SidebarAlumno from '../../components/Sidebars/SidebarAlumno';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const InicioAlumno = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6; 
  const useralumno = localStorage.getItem("user_name");
  const useralumnopassword = localStorage.getItem("user_lastname");
  const [Classes, setClasses] = useState([])
  useEffect(() => {
    setClasses(getData())
  }, [])
  const getData = async () =>{
    return await axios.get("http://localhost:3000/classes")
    .then((res)=>res.data)
    .catch((res)=>res)
  }
  console.log(Classes)

  
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= Classes.length - itemsPerPage ? 0 : prevIndex + itemsPerPage
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Classes.length - itemsPerPage : prevIndex - itemsPerPage
    );
  };

  return (
    <div className="flex min-h-screen bg-white text-[#37352f]">
      {/* Sidebar */}
      <SidebarAlumno />
      {/* Contenido Principal */}
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-semibold text-gray-900">Bienvenido, {useralumno} {useralumnopassword}!</h1>
        <p className="mt-4 text-gray-600">
          Aquí puedes acceder a tus clases, revisar tu progreso y mucho más.
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

         {/* Carrusel de Clases
         <div className="mt-8 w-full relative">
          <h2 className="text-2xl font-semibold">Clases</h2>
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={handlePrev}
              className="p-2 bg-gray-300 rounded-full hover:bg-gray-400"
            >
              <FaChevronLeft />
            </button>
            <div className="flex overflow-hidden space-x-4 w-full px-4">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${(currentIndex * (100 / itemsPerPage))}%)`,
                  width: `${(Classes.length / itemsPerPage) * 100}%`,
                }}
              >
                {Classes.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="min-w-[30%] p-4 bg-white shadow-md rounded-lg"
                  >
                    <p className="text-lg text-gray-700">{classItem.materia}</p>
                    <p className="text-gray-600">{classItem.curso}</p>
                    <p className="text-gray-600">{classItem.profesor}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleNext}
              className="p-2 bg-gray-300 rounded-full hover:bg-gray-400"
            >
              <FaChevronRight />
            </button>
          </div>
        </div> */}

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
