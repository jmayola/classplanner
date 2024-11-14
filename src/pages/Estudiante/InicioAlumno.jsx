import React, { useEffect, useState } from 'react';
import SidebarAlumno from '../../components/Sidebars/SidebarAlumno';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import axios from 'axios';

const Alerts = withReactContent(Swal);

const InicioAlumno = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [classes, setClasses] = useState([]);
  const [userData, setUserData] = useState({ name: '', lastname: '' });
  const itemsPerPage = 6;

  useEffect(() => {
      try {
        axios.get('http://localhost:3000/classes', {withCredentials: true}).then((response)=>setClasses(response.data))
        .catch((err)=>handleAxiosError(err, 'Error al cargar las clases'))
      } catch (error) {
        handleAxiosError(error, 'Error al cargar las clases');
      }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user', {withCredentials: true});
        setUserData(response.data); 
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
    fetchUser();
  }, []);

  const handleAxiosError = (error, customMessage) => {
    let message = customMessage;
    if (error.response) {
      message += ` - Código: ${error.response.status}. ${error.response.data.message || ''}`;
    } else if (error.request) {
      message = 'No se recibió respuesta del servidor. Intente más tarde.';
    } else {
      message = `Error inesperado: ${error.message}`;
    }
    Alerts.fire({ title: <p>Error</p>, text: message, icon: 'error' });
  };

  // Manejar la paginación
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

  return (
    <div className="flex min-h-screen bg-white text-[#37352f]">
      <SidebarAlumno />
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          Bienvenido {userData.user_type}, {userData.username} {userData.lastname}!
        </h1>
        <p className="mt-4 text-gray-600">
          Aquí puedes acceder a tus clases, revisar tu progreso y mucho más.
        </p>

        {/* Sección de Clases */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Clases</h2>
          <div className="mt-4 space-y-4">
            {/* {classes != [] && classes.map((clase, index) => ( */}
             {classes != [] &&classes.slice(currentIndex, currentIndex + itemsPerPage).map((clase, index) => (
              <div key={index} className={`p-4 shadow-md rounded-lg border-b-2`} style={{borderBlockColor: clase.class_color}}>
                <p className="text-lg text-gray-700">{clase.class_name}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button onClick={handlePrev} className="p-2 bg-gray-200 rounded">
              <FaChevronLeft />
            </button>
            <button onClick={handleNext} className="p-2 bg-gray-200 rounded">
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Sección de Calendario */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Calendario</h2>
          <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
            <Link to="/calendario" className="text-lg text-blue-500">
              Ver calendario completo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioAlumno;
