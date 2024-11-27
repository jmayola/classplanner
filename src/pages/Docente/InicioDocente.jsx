import React, { useEffect, useState } from 'react';
import { FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Alerts from 'sweetalert2';
import SidebarProfesor from '../../components/Sidebars/SidebarProfesor';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useClasses } from '../../../contexts/Classes';

const InicioDocente = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [className, setClassName] = useState('');
  const [classCourse, setClassCourse] = useState('');
  const [Color, setColor] = useState('');
  const [classDate, setClassDate] = useState('');
  const [userData, setUserData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const itemsPerPage = 3;
  const {classes, setClasses, user ,fetchClasses} = useClasses()
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/classes", { withCredentials: true });
        if (response.data) {
          setClasses(response.data); 
          setUserData(user)
        }
      } catch (err) {
        setError('Error al cargar las Clases');
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
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

  function generateUniqueCode(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }

    return code;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const uniqueCode = generateUniqueCode();
    const data = {
      class_name: className,
      class_curso: classCourse,
      class_color: Color,
      class_token: uniqueCode,
    };
    
    await axios
      .post("http://localhost:3000/classes", data, { withCredentials: true })
      .then((res) =>
        res.status === 202
          ? Alerts.fire({
              title: 'Clase agregada',
              text: `Código de clase: ${uniqueCode}`,
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'Copiar código',
              cancelButtonText: 'Cerrar',
            }).then((result) => {
              if (result.isConfirmed) {
                navigator.clipboard.writeText(uniqueCode);
                Alerts.fire('Copiado!', 'El código de clase ha sido copiado al portapapeles.', 'success');
              }
            })
          : Alerts.fire({
              title: 'Error',
              text: `No se pudo crear la clase`,
              icon: 'error',
            })
      );

    setClassName('');
    setClassCourse('');
    setColor('#ffffff');
    setClassDate('');
    setFormVisible(false);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  return (
    <div className="flex min-h-screen max-lg:h-[50vh] text-[#37352f]">
      <SidebarProfesor user={userData}/>
  
      <div className="flex-grow p-6 bg-white">
        <h1 className="text-3xl font-semibold">Bienvenido, Profesor</h1>
        <p className="mt-4 text-gray-600">Acá podés administrar tus clases</p>
  
        {/* Sección de Clases */}
        <div className="mt-8 w-full relative">
          <h2 className="text-2xl font-semibold">Clases</h2>
  
          {/* Mostrar mensaje de carga o error */}
          {loading ? (
            <p>Cargando clases...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : classes.length === 0 ? (
            <p>No hay clases disponibles</p>
          ) : (
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handlePrev}
                className="p-2"
              >
                <FaChevronLeft />
              </button>
  
              <div className="flex overflow-hidden space-x-4 w-full px-4 max-lg:flex-col">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${(currentIndex * (100 / itemsPerPage))}%)`,
                    width: `${(classes.length / itemsPerPage) * 100}%`,
                  }}
                >
                  {classes.map((clase, index) => (
                <Link to={"/vistaclasedocente"} state={{classes:clase, user:userData, id:clase.class_token}}>
                  <div className='justify-around mx-2'>
                    <div
                      key={index}
                      className="relative border-b-2 shadow-md rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-200 w-[130px]"
                    >
                      <div
                        className="h-32"
                        style={{ backgroundColor: clase.class_color }}
                      ></div>

                      {/* Contenido superpuesto */}
                      <div className="relative -mt-16 p-4 bg-white rounded-b-lg">
                        <h2 className="text-lg font-semibold text-gray-800 truncate">
                          {clase.class_name}
                        </h2>
                        <p className="text-sm text-gray-600 truncate">{clase.class_curso}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
                </div>
              </div>
  
              <button
                onClick={handleNext}
                className="p-2"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
  
        {/* Botón para agregar clase */}
        <button
          onClick={handleAddClass}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-md hover:bg-blue-700"
        >
          <FaPlus className="text-2xl" />
        </button>
  
        {/* Formulario para agregar clase */}
        {isFormVisible && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-full max-w-md p-10 space-y-8 bg-white shadow-lg rounded-[20px]">
              <h2 className="text-4xl font-semibold text-black text-center">Agregar Clase</h2>
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
  
             
                  <div className="flex flex-row">
                    <input
                      type="color"
                      id="classColor"
                      value={Color}
                      onChange={(e) => setColor(e.target.value)}
                      className="block w-full placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-20"
                      required
                    />
                  </div>
                </div>
  
                <div className="flex flex-col">
                  <button
                    onClick={handleSubmit}
                    className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-[30px] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Crear clase
                  </button>
                  <button
                    onClick={handleCloseForm}
                    className="w-full px-6 py-3  text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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



