import React, { useState, useEffect } from 'react';
import { FaPaperclip, FaCommentDots, FaPlus, FaCheck, FaChevronDown, FaFileAlt, FaTrash } from 'react-icons/fa';
import SidebarAlumno from '../../components/Sidebars/SidebarAlumno';
import BannerClase from '../../components/BannerClase';

function VistaTarea() {
  const [classComment, setClassComment] = useState('');
  const [workComment, setWorkComment] = useState('');
  const [showClassCommentInput, setShowClassCommentInput] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showDetails, setShowDetails] = useState(false); 
  const [taskStatus, setTaskStatus] = useState('');
  const [attachment, setAttachment] = useState(null);   
  const [userData, setUserData] = useState({ user_lastname: "Peña", user_name: "Verdun", user_type: "alumno" });

  const [comments, setComments] = useState([]); 

  const dueDate = new Date('2024-11-18T23:59:00');  

  const [activeTab, setActiveTab] = useState('Tareas');
  const [data, setData] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    
    if (currentDate <= dueDate) {
      setTaskStatus('Asignado');
    } else {
      setTaskStatus('Sin entregar');
    }
  }, [dueDate]);

  const handleClassCommentSubmit = () => {
    if (classComment.trim()) {
      const newComment = {
        id: new Date().getTime(), 
        text: classComment,
        userName: `${userData.user_name} ${userData.user_lastname}`,
        time: new Date().toLocaleString(), 
      };
      setComments([newComment, ...comments]); 
      setClassComment('');
      setShowClassCommentInput(false);
    }
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const handleWorkSubmit = () => {
    console.log("Trabajo entregado:", workComment);
    console.log("Archivo adjunto:", attachment);
    setWorkComment('');
    setSubmitted(true);
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarAlumno 
        classes={{ id_class: 1, class_name: "filosia de linux", class_curso: "8mo 2da", class_token: "asidj23" }} 
        user={userData} 
      />
  
      <div className="flex-1 overflow-y-auto">
        {/* Banner */}
        <BannerClase 
          className="Clase 1" 
          classCurso="7mo 2da" 
          userName={userData.user_name} 
          userLastname={userData.user_lastname} 
        />
  
        {/* Contenido de la tarea */}
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6 overflow-y-auto">
          {/* Información de la Tarea */}
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-gray-900">Título de la tarea</h2>
            <p className="text-sm text-gray-500">
              Vencimiento: {dueDate.toLocaleDateString()} {dueDate.toLocaleTimeString()}
            </p>
            <p className="text-sm text-gray-500">Puntos: 10</p>
          </div>
  
          {/* Comentarios de Clase */}
          <div className="border-t pt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
              <FaCommentDots className="mr-2" /> Comentarios de clase
            </h3>
            <div className="space-y-4 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-center">
                  <div>
                    <div className="text-sm text-gray-600 font-semibold">
                      {comment.userName} - {comment.time}
                    </div>
                    <p className="text-gray-800">{comment.text}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-500 hover:text-red-700 ml-auto"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
  
            {/* Formulario para agregar comentario */}
            {!showClassCommentInput ? ( 
              <button
                onClick={() => setShowClassCommentInput(true)}
                className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
              >
                <FaPlus className="mr-2" />
                Agregar comentario
              </button>
            ) : (
              <div className="space-y-4">
                <textarea
                  value={classComment}
                  onChange={(e) => setClassComment(e.target.value)}
                  placeholder="Escribe un comentario de clase"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleClassCommentSubmit}
                    disabled={!classComment}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                  >
                    Comentar
                  </button>
                  <button
                    onClick={() => setShowClassCommentInput(false)}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
                  >
                    Ocultar comentario
                  </button>
                </div>
              </div>
            )}
          </div>
  
          {/* Entrega de Trabajo */}
          <div className="border-t pt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
              <FaFileAlt className="mr-2" />
              <span>Tu trabajo</span>
              <FaChevronDown
                onClick={() => setShowDetails(!showDetails)}
                className={`ml-2 cursor-pointer ${showDetails ? 'rotate-180' : ''}`}
              />
            </h3>
            <div className="flex flex-wrap justify-between items-center">
              {!showDetails ? (
                <div className="flex items-center text-gray-600 space-x-2">
                  {!submitted ? (
                    <label className="px-4 py-2 border border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 flex items-center cursor-pointer">
                      <FaPaperclip className="mr-2" />
                      Agregar Trabajo
                      <input
                        type="file"
                        onChange={handleAttachmentChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center text-green-600 space-x-2">
                      <FaCheck className="text-xl" />
                      <p>Trabajo entregado</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4 w-full">
                  {submitted ? (
                    <div className="flex items-center text-green-600 space-x-2">
                      <FaCheck className="text-xl" />
                      <p>Trabajo entregado</p>
                    </div>
                  ) : (
                    <div>
                      <textarea
                        value={workComment}
                        onChange={(e) => setWorkComment(e.target.value)}
                        placeholder="Detalles sobre tu trabajo (opcional)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={handleWorkSubmit}
                          disabled={!workComment && !attachment} 
                          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 flex items-center"
                        >
                          <FaCheck className="mr-2" />
                          Entregar trabajo
                        </button>
                        <label className="px-4 py-2 border border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 flex items-center cursor-pointer">
                          <FaPaperclip className="mr-2" />
                          Agregar Trabajo
                          <input
                            type="file"
                            onChange={handleAttachmentChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
  
          <div className="border-t pt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Estado de la tarea
            </h3>
            <div className={`text-lg font-semibold ${taskStatus === 'Asignado' ? 'text-green-600' : 'text-red-600'}`}>
              {taskStatus === 'Asignado' ? 'Asignado' : 'Sin entregar'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default VistaTarea;