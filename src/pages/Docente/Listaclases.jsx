import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Sidebar from '../../components/Sidebars/SidebarProfesor';
import { Link } from 'react-router-dom';

const Listaclases = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [className, setClassName] = useState('');
  const [classCourse, setClassCourse] = useState('');
  const [classProfessor, setClassProfessor] = useState('');
  const [classDate, setClassDate] = useState('');
  const [classes, setClasses] = useState([
    {
      id: 1,
      materia: 'Matemática',
      curso: '7° 2°',
      description: 'Curso de matemáticas para nivel avanzado.',
      profesor: 'Juan Pérez',
      image: 'https://www.windowslatest.com/wp-content/uploads/2024/05/Bloom-wallpaper-OLED-scaled.jpg'  
    },
    {
      id: 2,
      materia: 'Literatura',
      curso: '7° 2°',
      profesor: 'Ana López',
      image: 'https://www.windowslatest.com/wp-content/uploads/2024/05/Bloom-wallpaper-OLED-scaled.jpg'
    },
    {
      id: 3,
      materia: 'Historia del Arte',
      curso: '7° 2°',
      profesor: 'Carlos Martínez',
      image: 'https://www.windowslatest.com/wp-content/uploads/2024/05/Bloom-wallpaper-OLED-scaled.jpg' 
    },{
      id: 1,
      materia: 'Matemática',
      curso: '7° 2°',
      description: 'Curso de matemáticas para nivel avanzado.',
      profesor: 'Juan Pérez',
      image: 'https://www.windowslatest.com/wp-content/uploads/2024/05/Bloom-wallpaper-OLED-scaled.jpg'  
    },
    {
      id: 2,
      materia: 'Literatura',
      curso: '7° 2°',
      profesor: 'Ana López',
      image: 'https://www.windowslatest.com/wp-content/uploads/2024/05/Bloom-wallpaper-OLED-scaled.jpg'
    },
    {
      id: 3,
      materia: 'Historia del Arte',
      curso: '7° 2°',
      profesor: 'Carlos Martínez',
      image: 'https://www.windowslatest.com/wp-content/uploads/2024/05/Bloom-wallpaper-OLED-scaled.jpg' 
    },
  ]);

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
        image: 'https://example.com/default.jpg'  // Default image URL
      }
    ]);
    // Clear form fields
    setClassName('');
    setClassCourse('');
    setClassProfessor('');
    setClassDate('');
    setFormVisible(false);
  };

  return (
    <div className="flex h-screen bg-white">
      <SidebarProfesor />

      <div className="flex flex-col w-full">
        {/* Class list */}
        <div className="flex-1 px-20 py-10 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {classes.map((classItem) => (
              <div
                key={classItem.id}
                className="bg-white border border-gray-100 rounded-[10px] transition duration-200 hover:shadow-lg overflow-hidden"
              >
                {/* Class cover image */}
                <img
                  src={classItem.image}
                  alt={classItem.materia}
                  className="w-full h-32 object-cover"
                />

                {/* Class content */}
                <Link to="/vistaclase"> 
                  <div className="p-4">
                    <h2 className="text-2xl font-bold mb-2">{classItem.materia}</h2>
                    <p className="text-gray-800 mb-2">{classItem.curso}</p>
                    <p className="text-gray-800 mb-2">{classItem.profesor}</p>
                  </div>
                </Link>

                {/* Separator (similar to Google Classroom) */}
                <div className="border-t border-gray-200"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Class Button */}
        <button
          onClick={handleAddClass}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-md hover:bg-blue-700"
        >
          <FaPlus className="text-2xl" />
        </button>
      </div>

      {/* Add Class Form */}
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
    </div>
  );
};

export default Listaclases;
