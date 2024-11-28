import React, { useEffect, useState } from 'react';
import SidebarAlumno from '../../components/Sidebars/SidebarAlumno';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaPlus, FaTimes, FaRegFrown } from 'react-icons/fa'; 
import { IoAdd, IoChevronBack, IoChevronForward, IoCopyOutline } from 'react-icons/io5';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useClasses } from '../../../contexts/Classes';
const Alerts = withReactContent(Swal);

const InicioAlumno = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [newCode, setNewCode] = useState('');
  const itemsPerPage = 6;
  const { classes, setClasses, user, fetchClasses } = useClasses();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchClasses();  
        setLoading(false);  
        setUserData(user);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, classes, fetchClasses]);

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

  const handleAddCode = () => {
    axios.post("http://localhost:3000/joinClass", { "class_token": newCode }, { withCredentials: true })
      .then((res) => {
        if (res.status == 202 || res.status == 200) {
          setNewCode('');
          setShowInput(false);
          Alerts.fire({ title: <p>Código agregado</p>, text: `Código ${newCode} agregado correctamente.`, icon: 'success' });
          fetchClasses();
        }
      })
      .catch((err) => {
        Alerts.fire({ title: "Error", text: err.response.data, icon: 'error' });
      });
  };

  return (
    <div className="flex min-h-screen bg-white text-[#37352f]">
      {classes && user && <SidebarAlumno user={userData} />}
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          Bienvenido, {user.user_name} {user.user_lastname}!
        </h1>
        <p className="mt-4 text-gray-600">
          Acá podes acceder a tus clases, revisar tu progreso y mucho más.
        </p>

        {/* Sección de Clases */}
        <div className="mt-8 w-full relative">
          <h2 className="text-2xl font-semibold">Clases</h2>
  
          {/* Mostrar mensaje de carga o error */}
          {loading ? (
            <p>Cargando clases...</p>
          ) : classes.length === 0 ? (
            <p>No estas inscrito/a en ninguna clase</p>
          ) : (
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handlePrev}
                className="p-2"
              >
                <IoChevronBack size={24}/>
              </button>
  
              <div className="flex overflow-hidden w-full space-x-4 max-w-full px-4">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${(currentIndex * (100 / itemsPerPage))}%)`,
                    width: `min(100%, ${(classes.length / itemsPerPage) * 100}%)`,
                  }}
                >
                  {classes.map((clase, index) => (
                <Link to={"/vistaclase"} state={{classes:clase, user:userData, id:clase.class_token}}>
                  <div className='justify-around mx-2'>
                    <div
                      key={index}
                      className="relative border-b-2 shadow-md rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-200 w-[200px] h-[200px]"
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
                      <div className='border-t border-gray-200 w-[90%] m-auto'/>
                      <div>
                        <p className="text-m text-[#222] px-4 py-3 truncate flex items-center justify-between">
                          {clase.class_token}
                          <IoCopyOutline
                                onClick={() => handleCopy(clase.class_token)}
                                color='#000'
                              />
                        </p> 
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
                <IoChevronForward size={24}/>
              </button>
            </div>
          )}
        </div>
      </div>
          
      <button
          onClick={() => setShowInput(true)}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-md hover:bg-blue-700"
        >
          <IoAdd className="text-2xl" />
        </button>

      {showInput && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded shadow-lg flex flex-col items-center space-y-4 w-80">
            <div 
              onClick={() => setShowInput(false)}
              className="absolute top-4 right-4 w-4 h-4 bg-[#ca1c1c] rounded-full flex items-center justify-center cursor-pointer"
            >
              <IoAdd color='#fff' size={10}/>
            </div>

            <input
              type="text"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="Ingresa el código"
              className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
            />
            <button
              onClick={handleAddCode}
              disabled={!newCode}
              className="w-[80%] px-6 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-[30px] hover:bg-[#006F7D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Agregar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InicioAlumno;
