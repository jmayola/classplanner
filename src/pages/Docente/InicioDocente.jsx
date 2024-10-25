import React, { useState, useEffect } from 'react';
import axios from 'axios';   
import SidebarProfesor from '../../components/Sidebars/SidebarProfesor';
import { FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const InicioDocente = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [className, setClassName] = useState('');
  const [classCourse, setClassCourse] = useState('');
  const [classProfessor, setClassProfessor] = useState('');
  const [classDate, setClassDate] = useState('');
  const [classes, setClasses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState({}); 
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/classes');
        console.log(response.data); 
        setClasses(response.data); 
      } catch (error) {
        console.error('Error al obtener las clases:', error);
      }
    };

    fetchClasses(); 
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user');
        console.log(response.data); 
        setUser(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUser(); 
  }, []);

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
    ]);
    setClassName('');
    setClassCourse('');
    setClassProfessor('');
    setClassDate('');
    setFormVisible(false);
  };

  return (
    <div className="flex min-h-screen text-[#37352f]">
      <SidebarProfesor />

      <div className="flex-grow p-6 bg-white">
        <h1 className="text-3xl font-semibold">
          Bienvenido, {user.name} {user.lastname}!
        </h1>
        <p className="mt-4 text-gray-600">Acá podes administrar tus clases</p>

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
            <div className="bg-white p-6 rounded-lg shadow-lg w-[50%] px-10 py-10">
              <h2 className="text-2xl font-bold mb-4">Agregar Clase</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="className" className="block text-[#333]">
                    Materia
                  </label>
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
                  <label htmlFor="classCourse" className="block text-[#333]">
                    Curso
                  </label>
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
                  <label htmlFor="classProfessor" className="block text-[#333]">
                    Nombre del Profesor
                  </label>
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
                  <label htmlFor="classDate" className="block text-[#333]">
                    Fecha de Inicio
                  </label>
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
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-[20px] hover:bg-blue-800"
                  >
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
      </div>
    </div>
  );
};

export default InicioDocente;
