import React, { useEffect, useState } from 'react';
import SidebarAlumno from '../../components/Sidebars/SidebarAlumno';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaPlus, FaTimes } from 'react-icons/fa';
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
  const {classes, setClasses, user ,fetchClasses} = useClasses()
  useEffect(() => {
    if(classes.length >= 1){
      setLoading(false)
      setUserData(user)
    }
  }, [user,classes]);

  const handleAxiosError = (error, customMessage) => {
    let message = customMessage;
    if (error.response) {
      message += ` - Código: ${error.response.status}. ${error.response.data.message || ''}`;
    } else if (error.request) {
      message = 'No se recibió respuesta del servidor. Intente más tarde.';
    } else {
      message = `Error inesperado: ${error.message}`;
    }
    setError(message);
    Alerts.fire({ title: <p>Error</p>, text: message, icon: 'error' });
  };

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
    axios.post("http://localhost:3000/joinClass",{"class_token":newCode},{withCredentials:true})
    .then((res)=>{
      if(res.status == 202 || res. status == 200){
        setNewCode('');
        setShowInput(false);
        Alerts.fire({ title: <p>Código agregado</p>, text: `Código ${newCode} agregado correctamente.`, icon: 'success' });
        fetchClasses()
      }})
      .catch((err)=>{
        Alerts.fire({ title: "Error", text: err.response.data, icon: 'error' });
      })
  };

  return (
    <div className="flex min-h-screen bg-white text-[#37352f]">
      {classes && user && <SidebarAlumno user={userData} />}
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          {userData.user_name}
          Bienvenido, {user.user_name} {user.user_lastname}!
        </h1>
        <p className="mt-4 text-gray-600">
          Aquí puedes acceder a tus clases, revisar tu progreso y mucho más.
        </p>

        {/* Sección de Clases */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Clases</h2>
          <div className="mt-4 space-y-4">
            {loading ? (
              <p>Cargando clases...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : classes.length === 0 ? (
              <p>No tienes clases asignadas</p>
            ) : (
              classes.map((clase, index) => (
                <Link to={"/vistaclase"} state={{classes:clase, user:userData, id:clase.class_token}}>
                <div key={index} className={`p-4 shadow-md rounded-lg border-b-2`} style={{borderBlockColor: clase.class_color}}>
                  <p className="text-lg text-gray-700">{clase.class_name}</p>
                </div>
                </Link>
              ))
            )}
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

      <div className="fixed bottom-8 right-8">
        <button onClick={() => setShowInput(!showInput)} className="p-4 bg-blue-500 rounded-full text-white shadow-lg">
          <FaPlus />
        </button>
      </div>

      {showInput && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded shadow-lg flex flex-col items-center space-y-4 w-80">
          
            <div 
              onClick={() => setShowInput(false)}
              className="absolute top-4 right-4 w-4 h-4 bg-[#ca1c1c] rounded-full flex items-center justify-center cursor-pointer"
            >
              <FaTimes color='#fff' size={10}/>
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
