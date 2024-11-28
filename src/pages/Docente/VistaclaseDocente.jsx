import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoClipboardOutline, IoMegaphoneOutline, IoBookOutline, IoCalendarNumberOutline, IoCopyOutline } from 'react-icons/io5';
import AgregarClase from "../../components/AgregarClase";
import withReactContent from 'sweetalert2-react-content';
import { Link, useLocation } from 'react-router-dom';
import SidebarDocente from '../../components/Sidebars/SidebarProfesor';
import BannerClase from '../../components/BannerClase';
import LoadingScreen from '../../components/LoadingScreen'; 
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import CopyNotification from '../../components/CopyNotification';

const Alerts = withReactContent(Swal);

const VistaclaseDocente = () => {
  let { classes, user, id } = useLocation().state;
  const [activeTab, setActiveTab] = useState('Tareas');
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState({ name: '', lastname: '' });
  const [Class, setClass] = useState([]);
  const [Tarea, setTarea] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [CalendarData, setCalendar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); 
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
  }, [classes, user, id]);

  const getTareas = () => {
    axios.get("http://localhost:3000/tasks", { withCredentials: true })
      .then((res) => {
        const data = res.data.filter((val) => val.id_class === classes.id_class);
        setTarea(data);
        setLoading(false); 
      })
      .catch((error) => {
        setLoading(false); 
        console.error("Error al obtener las tareas", error);
      });
  };

  const getCalendar = () => {  
    axios.get(`http://localhost:3000/calendar`, { withCredentials: true })
      .then((res) => {
        setCalendar(res.data);
      })
      .catch((error) => {
        console.error("Error al obtener los calendarios:", error);
      });
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
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
      return [];
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen /> 
      ) : (
        <div className="flex bg-gray-100 -z-0">
          {classes && user && <SidebarDocente classes={classes} user={user} />}

          <div className="flex flex-col w-full -z-0">
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

            <div className="flex max-sm:flex-wrap justify-center bg-white shadow-md">
              <button
                onClick={() => handleTabClick('Tareas')}
                className={`px-6 py-3 flex items-center space-x-2 ${activeTab === 'Tareas' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
              >
                <IoClipboardOutline /> <span>Tareas</span>
              </button>
              <button
                onClick={() => handleTabClick('Materiales')}
                className={`px-6 py-3 flex items-center space-x-2 ${activeTab === 'Materiales' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
              >
                <IoBookOutline /> <span>Materiales</span>
              </button>
              <button
                onClick={() => handleTabClick('Anuncios')}
                className={`px-6 py-3 flex items-center space-x-2 ${activeTab === 'Anuncios' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
              >
                <IoMegaphoneOutline /> <span>Anuncios</span>
              </button>
              <button
                onClick={() => handleTabClick('Calendario')}
                className={`px-6 py-3 flex items-center space-x-2 ${activeTab === 'Calendario' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
              >
                <IoCalendarNumberOutline /> <span>Calendario</span>
              </button>
            </div>

            {activeTab === 'Tareas' && (
              <div className="flex flex-wrap p-10">
                <div className=" h-[120px] p-5 bg-white shadow-md rounded-lg mr-10">
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
                        <Link to={"/vistatareadocente"} state={{ classes: Class, user: userData, tarea: tarea }} key={index}>
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
            
            {activeTab === 'Materiales' && (
              <div className="flex p-10">
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
                  <h2 className="text-3xl font-bold mb-6">Materiales</h2>
                  <p>No hay materiales disponibles por el momento.</p>
                </div>
              </div>
            )}
            {activeTab === 'Anuncios' && (
              <div className="flex p-10">
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
                  <h2 className="text-3xl font-bold mb-6">Anuncios</h2>
                  <p>No hay anuncios disponibles por el momento.</p>
                </div>
              </div>
            )}
            {activeTab === 'Calendario' && (
              <div className="flex p-10">
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
              </div>
            )}
          </div>
          <AgregarClase id_class={Class.id_class} />
        </div>
      )}
    </>
  );
};

export default VistaclaseDocente;


