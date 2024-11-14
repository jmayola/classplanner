import React, { useState, useEffect } from 'react';
import axios from 'axios';   
import SidebarProfesor from '../../components/Sidebars/SidebarProfesor';
import { FaPlus, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const InicioDocente = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [className, setClassName] = useState('');
  const [classCourse, setClassCourse] = useState('');
  const [classProfessor, setClassProfessor] = useState('');
  const [classDate, setClassDate] = useState('');
  const [classes, setClasses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= classes.length - itemsPerPage ? 0 : prevIndex + itemsPerPage
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? classes.length - itemsPerPage : prevIndex - itemsPerPage
    );
  };

  const handleAddClass = () => {
    setFormVisible(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setClasses([
      ...classes,
      {
        id: classes.length + 1,
        materia: className,
        curso: classCourse,
        profesor: classProfessor,
        date: classDate,
      },
        date: classDate,
      },
    ]);
    setClassName('');
    setClassCourse('');
    setClassProfessor('');
    setClassDate('');
    setFormVisible(false);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  return (
    <div className="flex min-h-screen text-[#37352f]">
      <SidebarProfesor />

      <div className="flex-grow p-6 bg-white">
        <h1 className="text-3xl font-semibold">Bienvenido, Profesor</h1>
        <p className="mt-4 text-gray-600">Acá podés administrar tus clases</p>

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
                  width: `${(classes.length / itemsPerPage) * 100}%`,
                }}
              >
                {classes.map((classItem) => (
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
        </div>

        <button
          onClick={handleAddClass}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-md hover:bg-blue-700"
        >
          <FaPlus className="text-2xl" />
        </button>

        {isFormVisible && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-md p-10 space-y-8 bg-white shadow-lg rounded-[20px]">
            {/* <button
              onClick={handleCloseForm}
              className="absolute top-4 right-4 w-4 h-4 bg-[#ca1c1c] rounded-full flex items-center justify-center cursor-pointer"
            ></button> */}
            <h2 className="text-4xl font-semibold text-black text-center">
              Agregar Clase
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label htmlFor="className" className="sr-only">Materia</label>
                  <input
                    type="text"
                    id="className"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Materia"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="classCourse" className="sr-only">Curso</label>
                  <input
                    type="text"
                    id="classCourse"
                    value={classCourse}
                    onChange={(e) => setClassCourse(e.target.value)}
                    className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Curso"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="classProfessor" className="sr-only">Nombre del Profesor</label>
                  <input
                    type="text"
                    id="classProfessor"
                    value={classProfessor}
                    onChange={(e) => setClassProfessor(e.target.value)}
                    className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Nombre del Profesor"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="classDate" className="sr-only">Fecha de Inicio</label>
                  <input
                    type="date"
                    id="classDate"
                    value={classDate}
                    onChange={(e) => setClassDate(e.target.value)}
                    className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between space-x-3">
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-[30px] hover:bg-[#002746] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mt-3"
                >
                  Agregar
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="w-full px-6 py-3 text-sm font-medium text-white bg-red-500 border border-transparent rounded-[30px] hover:bg-[#c40000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mt-3"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
        
        )}

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
