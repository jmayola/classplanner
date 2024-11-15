import React, { useState } from 'react';
import SidebarProfesor from '../../components/Sidebars/SidebarProfesor';
import BannerClase from '../../components/BannerClase';
import { FaUser, FaPaperPlane } from 'react-icons/fa';

function VistatareaDocente() {
  const [userData] = useState({ user_lastname: "Peña", user_name: "Verdun", user_type: "profesor" });
  const [activeTab, setActiveTab] = useState("instrucciones");
  const [acceptDeliveries, setAcceptDeliveries] = useState(true);
  const [assignedCount, setAssignedCount] = useState(1);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const [selectAllStudents, setSelectAllStudents] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]); 

  const toggleAcceptDeliveries = () => setAcceptDeliveries(!acceptDeliveries);
  const toggleSelectAll = () => setSelectAllStudents(!selectAllStudents);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        text: comment,
        user: `${userData.user_name} ${userData.user_lastname}`,
        time: new Date().toLocaleTimeString() 
      };
      setComments([newComment, ...comments]); 
      setComment(''); 
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarProfesor />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Banner */}
        <BannerClase 
          className="Clase 1" 
          classCurso="7mo 2da" 
          userName={userData.user_name} 
          userLastname={userData.user_lastname} 
        />

        {/* Tabs and Content */}
        <div className="p-6 bg-white shadow flex-1">
          {/* Tabs */}
          <div className="flex space-x-4 border-b border-gray-300 mb-4">
            <button
              onClick={() => setActiveTab("instrucciones")}
              className={`pb-2 px-4 ${activeTab === "instrucciones" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
            >
              Instrucciones
            </button>
            <button
              onClick={() => setActiveTab("trabajo")}
              className={`pb-2 px-4 ${activeTab === "trabajo" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
            >
              Trabajo de los estudiantes
            </button>
          </div>

          {/* Content for each tab */}
          {activeTab === "instrucciones" ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Instrucciones</h2>

              {/* Task Details */}
              <div className="mb-6">
                <p><strong>Título de la tarea:</strong> Trabajo de investigación sobre Ecosistemas</p>
                <p><strong>Vencimiento:</strong> 15 de noviembre, 2024</p>
                <p><strong>Puntos:</strong> 100</p>
              </div>

              {/* Attached Files */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold">Archivos adjuntos</h3>
                <ul className="list-disc list-inside">
                  <li><a href="/ruta/al/archivo1.pdf" className="text-blue-500">Guía de estudio.pdf</a></li>
                  <li><a href="/ruta/al/archivo2.docx" className="text-blue-500">Formato de presentación.docx</a></li>
                </ul>
              </div>

              {/* Class Comments */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <FaUser className="text-gray-500" /> Comentario de la clase
                </h3>

                {/* Display Comments */}
                <div className="mb-4 space-y-2">
                  {comments.map((c, index) => (
                    <div key={index} className="border p-2 rounded-md bg-gray-100">
                      <p className="text-sm text-gray-600">{c.user} - {c.time}</p>
                      <p>{c.text}</p>
                    </div>
                  ))}
                </div>

                {/* Input y botón para agregar comentarios */}
                <div className="flex items-center border-2 border-blue-400 rounded-md p-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Comentario de la clase"
                    className="flex-grow bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
                  />
                  <button
                    onClick={handleCommentSubmit}
                    className="text-blue-400 hover:text-blue-600 transition"
                  >
                    <FaPaperPlane size={20} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Trabajo de los estudiantes</h2>

              {/* Entregado y Asignados */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-8">
                  <span>Entregado: {deliveredCount}</span>
                  <span>Asignados: {assignedCount}</span>
                </div>

                {/* Toggle Button for Accepting Deliveries */}
                <div className="flex items-center space-x-2">
                  <span>Aceptar entregas:</span>
                  <button
                    onClick={toggleAcceptDeliveries}
                    className={`px-4 py-2 rounded ${acceptDeliveries ? "bg-green-500" : "bg-red-500"} text-white`}
                  >
                    {acceptDeliveries ? "Sí" : "No"}
                  </button>
                </div>
              </div>

              {/* Select Students */}
              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectAllStudents}
                    onChange={toggleSelectAll}
                    className="form-checkbox"
                  />
                  <span>Seleccionar todos los estudiantes</span>
                </label>
              </div>

              {/* Student List - Placeholder */}
              <ul className="space-y-2">
                <li className="flex items-center justify-between bg-gray-100 p-4 rounded">
                  <span>Juan Pérez</span>
                  <input type="checkbox" className="form-checkbox" checked={selectAllStudents} />
                </li>
                <li className="flex items-center justify-between bg-gray-100 p-4 rounded">
                  <span>María García</span>
                  <input type="checkbox" className="form-checkbox" checked={selectAllStudents} />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VistatareaDocente;
