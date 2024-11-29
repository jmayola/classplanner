import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebars/SidebarAlumno';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoClipboardOutline, IoMegaphoneOutline, IoBookOutline, IoCalendarNumberOutline, IoCopyOutline, IoRibbonOutline,IoPersonOutline } from 'react-icons/io5';
import withReactContent from 'sweetalert2-react-content';
import { Link, useLocation } from 'react-router-dom';
import BannerClase from '../../components/BannerClase';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import LoadingScreen from '../../components/LoadingScreen';
import GradesTableAlumno from '../../components/GradesTableAlumno';
import CopyNotification from '../../components/CopyNotification';
import UserClass from '../../components/UserClass';

const Alerts = withReactContent(Swal);

const Vistaclase = () => {
  let { classes, user, id } = useLocation().state;
  const [activeTab, setActiveTab] = useState('Tareas');
  const [data, setData] = useState(null);
  const [Students,setStudents] = useState([])
  const [userData, setUserData] = useState({ name: '', lastname: '' });
  const [Class, setClass] = useState([]);
  const [Tarea, setTarea] = useState([]);
  const [CalendarData, setCalendar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, SetLoading] = useState(false); 
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setUserData(user);
    setClass(classes);
    getTareas();
    getCalendar();
    getStudents()
    getCalificaciones();
  }, [classes, id, user]);

  const getTareas = () => {
    SetLoading(true); 
    axios.get("http://localhost:3000/tasks", { withCredentials: true })
      .then((res) => {
        const data = res.data.filter((val) => val.id_class === classes.id_class);
        setTarea(data);
        SetLoading(false); 
      })
      .catch((err) => {
        Alerts("Error", "No hay tareas", "error");
        SetLoading(false);
      });
  };
  const getStudents = () => {
    SetLoading(true); 
    axios.get(`http://localhost:3000/usersclass?id_class=${classes.id_class}`, { withCredentials: true })
      .then((res) => {
        setStudents(res.data)
        SetLoading(false); 
      })
      .catch((err) => {
        setStudents([])
        SetLoading(false);
      });
  };
  const getCalendar = () => {  
    SetLoading(true);
    axios.get(`http://localhost:3000/calendar`, { withCredentials: true })
      .then((res) => {
        setCalendar(res.data);
        SetLoading(false); 
      })
      .catch((error) => {
        console.error("Error al obtener los calendarios:", error);
        SetLoading(false);
      });
  };
  const getCalificaciones = () => {  
    SetLoading(true);
    axios.get(`http://localhost:3000/califications?id_class=${classes.id_class}`, { withCredentials: true })
      .then((res) => {
        setData(res.data); 
        SetLoading(false); 
      })
      .catch((error) => {
        console.error("Error al obtener las calificaciones:", error);
        SetLoading(false);
      });
  };
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  
  const handleCopy = (classToken) => {
    navigator.clipboard.writeText(classToken)
      .then(() => {
        setMessage(`Copiado`);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);  
        }, 3000);
      })
      .catch((err) => {
        console.error('Error al copiar:', err);
      });
  };
  

  const renderCalendarEvents = (date) => {
    try{
      const filteredEvents = CalendarData.filter((evento) => {
        const eventDate = new Date(evento.deliver_until);
        return eventDate.toLocaleDateString() === date.toLocaleDateString();
      });
      return filteredEvents;
    }
    catch(e){
      return []
    }
  };

  return (
    <div className="flex bg-gray-100 relative -z-0 ">
      {classes && user && <Sidebar classes={classes} user={user} />}
  
      <div className="flex flex-col w-full">
        {Class && (
          <BannerClase
            className={Class.class_name}
            classCurso={Class.class_curso}
            classColor={Class.class_color}
            classToken={Class.class_token}
            userName={userData.user_name}
            userLastname={userData.user_lastname}
          />
        )}
  
        {loading && <LoadingScreen />}
  
        <div className="flex max-sm:flex-wrap justify-center bg-white shadow-md">
          <button
            onClick={() => handleTabClick('Tareas')}
            className={`px-6 py-3 flex items-center space-x-2 ${activeTab === 'Tareas' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
          >
            <IoClipboardOutline /> <span>Tareas</span>
          </button>
          <button
            onClick={() => handleTabClick('Mis calificaciones')}
            className={`px-6 py-3 flex items-center space-x-2 ${activeTab === 'Materiales' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
          >
            <IoRibbonOutline /> <span>Mis calificaciones</span>
          </button>
          <button
            onClick={() => handleTabClick('Anuncios')}
            className={`px-6 py-3 flex items-center space-x-2 ${activeTab === 'Anuncios' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
          >
            <IoPersonOutline /> <span>Compañeros</span>
          </button>
          <button
            onClick={() => handleTabClick('Calendario')}
            className={`px-6 py-3 flex items-center space-x-2 ${activeTab === 'Calendario' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
          >
            <IoCalendarNumberOutline /> <span>Calendario</span>
          </button>
        </div>
  
        <div className="overflow-y-auto p-10">
          {activeTab === 'Tareas' && (
            <div className="flex">
              <div className="h-[120px] p-5 bg-white shadow-md rounded-lg mr-10">
                <div className="text-sm sm:text-base md:text-lg flex flex-col items-start px-1">
                  <h2 className='font-bold'>Código de la clase</h2>
                  <div className='flex flex-row mt-3 items-center justify-between'>
                    <p className='text-[#118de3] font-bold'>{classes.class_token}</p>
                    <div className="flex items-center space-x-2">
                      <IoCopyOutline 
                        onClick={() => handleCopy(classes.class_token)} 
                        color={copied ? '#118de3' : '#333'} 
                        className={`ml-10 ${copied ? 'animate-ping' : ''}`}  
                      />
                      {copied && <CopyNotification message={message} onClose={() => setCopied(false)} />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[80%]">
                <h2 className="text-3xl font-bold mb-6">Tareas</h2>
                <div className="grid grid-cols-1 gap-4">
                  {Tarea.length === 0 ? (
                    <div className="flex flex-col justify-center items-center py-10">
                      <IoClipboardOutline className="text-6xl text-gray-400" />
                      <p className="text-xl mt-4 text-gray-600">No hay tareas disponibles</p>
                    </div>
                  ) : (
                    Tarea.map((tarea, index) => (
                      <Link to={"/vistatarea"} state={{classes:Class, user:userData, tarea:tarea}} key={index}>
                        <div className="bg-white p-4 shadow-md rounded-lg flex items-center hover:bg-[#fafafa]">
                          {tarea.profesorImg ? (
                            <img 
                              src={tarea.profesorImg} 
                              alt={tarea.profesorNombre || "Profesor"} 
                              className="w-12 h-12 rounded-full mr-4"
                            />
                          ) : (
                            <IoClipboardOutline size={40} color='#fff' className='mr-3 bg-blue-500 p-2 rounded-full'/>
                          )}
                          <div>
                            <h3 className="text-[16px]">{tarea.title}</h3>
                            <p className="text-gray-600 text-[14px]">Fecha de entrega: {tarea.deliver_until}</p>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'Mis calificaciones' && (
            <div className="flex p-10">
              <div className="w-[20%] h-[120px] p-5 bg-white shadow-md rounded-lg mr-10">
                <div className="text-sm sm:text-base md:text-lg flex flex-col items-start px-1">
                  <h2 className="font-bold">Código de la clase</h2>
                  <div className="flex flex-row mt-3 items-center justify-between">
                    <p className="text-[#118de3] font-bold">{classes.class_token}</p>
                    <div className="flex items-center space-x-2">
                      <IoCopyOutline 
                        onClick={() => handleCopy(classes.class_token)} 
                        color={copied ? '#118de3' : '#333'} 
                        className={`ml-10 ${copied ? 'animate-ping' : ''}`}  
                      />
                      {copied && <CopyNotification message={message} onClose={() => setCopied(false)} />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[80%]">
                <h2 className="text-3xl font-bold mb-6">Calificaciones</h2>
                {data && data.length > 0 ? (
                  <GradesTableAlumno data={data} />
                ) : (
                  <div className="flex flex-col justify-center items-center py-10">
                    <IoRibbonOutline className="text-6xl text-gray-400" />
                    <p className="text-xl mt-4 text-gray-600">No tenes ninguna calificación por el momento</p>
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab === 'Anuncios' && (
            <div className='flex p-10'>
              <div className="w-[20%] h-[120px] p-5 bg-white shadow-md rounded-lg mr-10">
                <div className="text-sm sm:text-base md:text-lg flex flex-col items-start px-1">
                  <h2 className='font-bold'>Código de la clase</h2>
                  <div className='flex flex-row mt-3 items-center justify-between'>
                    <p className='text-[#118de3] font-bold'>{classes.class_token}</p>
                    <div className="flex items-center space-x-2">
                      <IoCopyOutline 
                        onClick={() => handleCopy(classes.class_token)} 
                        color={copied ? '#118de3' : '#333'} 
                        className={`ml-10 ${copied ? 'animate-ping' : ''}`}  
                      />
                      {copied && <CopyNotification message={message} onClose={() => setCopied(false)} />}
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-[80%]'>
                <h2 className="text-3xl font-bold mb-6">Compañeros</h2>
                {Students && Students.length > 0 ? (
                  <UserClass users={Students} />
                ) : (
                  <div className="flex flex-col justify-center items-center py-10">
                    <IoMegaphoneOutline />
                    <p className="text-xl mt-4 text-gray-600">No hay Compañeros unidos a la clase</p>
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab === 'Calendario' && (
            <div className='flex p-10'>
              <div className="w-[20%] h-[120px] p-5 bg-white shadow-md rounded-lg mr-10">
                <div className="text-sm sm:text-base md:text-lg flex flex-col items-start px-1">
                  <h2 className='font-bold'>Código de la clase</h2>
                  <div className='flex flex-row mt-3 items-center justify-between'>
                    <p className='text-[#118de3] font-bold'>{classes.class_token}</p>
                    <div className="flex items-center space-x-2">
                      <IoCopyOutline 
                        onClick={() => handleCopy(classes.class_token)} 
                        color={copied ? '#118de3' : '#333'} 
                        className={`ml-10 ${copied ? 'animate-ping' : ''}`}  
                      />
                      {copied && <CopyNotification message={message} onClose={() => setCopied(false)} />}
                    </div>
                  </div>
                </div>
              </div>
          
              <div className="w-[70%]">
                <h2 className="text-3xl font-bold mb-6">Calendario</h2>
                <div className="flex">
                  <div className="w-[50%] p-4 bg-white rounded-lg shadow-lg">
                    <Calendar 
                      onChange={handleDateChange}
                      value={selectedDate} 
                      tileClassName="calendar-tile"
                      tileContent={({ date, view }) => {
                        const events = renderCalendarEvents(date);
                        return events.length > 0 ? (
                          <div className="bg-blue-500 text-white text-xs p-1 rounded-full text-center">
                            {events.length}
                          </div>
                        ) : null;
                      }}
                    />
                  </div>            
                    
                  <div className="w-[50%] pl-6">
                    <h3 className="text-2xl font-bold mb-4">Eventos en esta fecha</h3>
                    {renderCalendarEvents(selectedDate).length === 0 ? (
                      <p>No hay eventos en esta fecha.</p>
                    ) : (
                      renderCalendarEvents(selectedDate).map((evento, index) => (
                        <div key={index} className="bg-white p-4 shadow-md rounded-lg mb-4 hover:bg-blue-100">
                          <h4 className="text-xl font-semibold">{evento.title}</h4>
                          <p className="text-gray-600">{evento.description}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
                  
              {data && data.calendario && renderCalendarEvents(selectedDate).length === 0 ? (
                <div className="flex flex-col justify-center items-center py-10">
                  <IoCalendarNumberOutline size={40} color="#118de3" />
                  <p className="text-xl mt-4 text-gray-600">No hay eventos disponibles</p>
                </div>
              ) : (
                data && data.calendario && (
                  <div className="flex flex-col items-center justify-center py-10">
                    <IoCalendarNumberOutline size={40} color="#118de3" />
                    <p className="text-xl mt-4 text-gray-600">{data.calendario}</p>
                  </div>
                )
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}  

export default Vistaclase;
