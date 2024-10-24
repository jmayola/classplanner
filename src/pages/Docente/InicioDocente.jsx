import React, { useState } from 'react';
import SidebarProfesor from '../../components/Sidebars/SidebarProfesor';
import { FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const InicioDocente = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [className, setClassName] = useState('');
  const [classCourse, setClassCourse] = useState('');
  const [classProfessor, setClassProfessor] = useState('');
  const [classDate, setClassDate] = useState('');
  const [classes, setClasses] = useState([
    { id: 1, materia: 'Matemática', curso: '7° 2°', profesor: 'Juan Pérez' },
    { id: 2, materia: 'Literatura', curso: '7° 2°', profesor: 'Ana López' },
    { id: 3, materia: 'Historia del Arte', curso: '7° 2°', profesor: 'Carlos Martínez' },
    { id: 4, materia: 'Ciencias', curso: '6° 1°', profesor: 'Luis García' },
    { id: 5, materia: 'Biología', curso: '6° 2°', profesor: 'Clara Torres' },
    { id: 6, materia: 'Geografía', curso: '5° 3°', profesor: 'Pedro Ramírez' },
  ]);

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
        date: classDate
      }
    ]);
    setClassName('');
    setClassCourse('');
    setClassProfessor('');
    setClassDate('');
    setFormVisible(false);
  };

  return (
    <div className="flex min-h-screen text-[#37352f]">
      {/* Sidebar */}
      <SidebarProfesor />

      {/* Contenido Principal */}
      <div className="flex-grow p-6 bg-white">
        <h1 className="text-3xl font-semibold">Bienvenido, Profesor</h1>
        <p className="mt-4 text-gray-600">Acá podes administrar tus clases</p>

        {/* Carrusel de Clases */}
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

        {/* Botón para agregar una clase */}
        <button
          onClick={handleAddClass}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-md hover:bg-blue-700"
        >
          <FaPlus className="text-2xl" />
        </button>

        {/* Formulario para agregar clase */}
        {isFormVisible && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[50%] px-10 py-10">
              <h2 className="text-2xl font-bold mb-4">Agregar Clase</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="className" className="block text-[#333]">Materia</label>
                  <input
                    type="text"
                    id="className"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="mt-1 block w-full rounded-[25px] bg-[#efebeb] py-5 shadow-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="classCourse" className="block text-[#333]">Curso</label>
                  <input
                    type="text"
                    id="classCourse"
                    value={classCourse}
                    onChange={(e) => setClassCourse(e.target.value)}
                    className="mt-1 block w-full rounded-[25px] bg-[#efebeb] py-5 shadow-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="classProfessor" className="block text-[#333]">Nombre del Profesor</label>
                  <input
                    type="text"
                    id="classProfessor"
                    value={classProfessor}
                    onChange={(e) => setClassProfessor(e.target.value)}
                    className="mt-1 block w-full border bg-[#efebeb] rounded-[25px] shadow-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="classDate" className="block text-[#333]">Fecha de Inicio</label>
                  <input
                    type="date"
                    id="classDate"
                    value={classDate}
                    onChange={(e) => setClassDate(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-[20px] hover:bg-blue-800">
                    Agregar
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormVisible(false)}
                    className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-[20px] hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
