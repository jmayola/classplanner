import React, { useEffect, useState } from "react";
import SidebarProfesor from "../../components/Sidebars/SidebarProfesor";
import BannerClase from "../../components/BannerClase";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Alerts from "../../../hooks/Alerts";
import { IoCalendarNumberOutline, IoClipboardOutline, IoChatbubbleOutline, IoPaperPlane, IoPerson } from "react-icons/io5";
function VistatareaDocente() {
  const { classes, user, tarea } = useLocation().state;
  const [userData, setUserData] = useState({
    user_lastname: "Peña",
    user_name: "Verdun",
    user_type: "profesor",
  });
  const [activeTab, setActiveTab] = useState("instrucciones");
  const [acceptDeliveries, setAcceptDeliveries] = useState(true);
  const [assignedCount, setAssignedCount] = useState(1);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const [selectAllStudents, setSelectAllStudents] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [Class, setClass] = useState([]);
  const [Submissions, setSubmissions] = useState([]);

  const toggleAcceptDeliveries = () => setAcceptDeliveries(!acceptDeliveries);
  const toggleSelectAll = () => setSelectAllStudents(!selectAllStudents);
  useEffect(() => {
    setUserData(user);
    setClass(classes);
    getComments();
    getSubmission();
  }, [classes, user]);
  const handleCommentSubmit = () => {
    if (comment) {
      const newComment = {
        id_task: tarea.id_task,
        text: comment,
        userName: userData.user_name,
        userLastname: userData.user_lastname,
        user_photo: {
          String: userData.user_photo,
        },
      };
      axios
        .post("http://localhost:3000/comments", newComment, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status == 202 || res.status == 200) {
            Alerts({
              title: "Comentario Añadido",
              message: "El comentario ha sido añadido a la clase",
              icon: "success",
            });
            setComments([newComment, ...comments]);
            setComment("");
            setShowClassCommentInput(false);
          }
        })
        .catch((err) => {
          Alerts({ title: "Error", message: err.response.data, icon: "error" });
        });
    }
  };
  const getComments = () => {
    axios
      .get("http://localhost:3000/comments?id_task=" + tarea.id_task, {
        withCredentials: true,
      })
      .then((res) => setComments(res.data));
  };
  const getSubmission = () => {
    axios
      .get("http://localhost:3000/submissions?id_task=" + tarea.id_task, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status == 202 || res.status == 200) {
          let response = res.data;
          setSubmissions(response);
        }
      });
  };
  const handleInputChange = (id_submission, field, value) => {
    if (field == "calification" && value.length >2 || parseInt(value) > 10){
      return
    }
    setSubmissions((prev) =>
      prev.map((submission) =>
        submission.id_submission === id_submission
          ? { ...submission, [field]: value, changed: true }
          : submission
      )
    );
  };

  const handleSubmit = (id_submission) => {
    const submission = Submissions.find(
      (item) => item.id_submission === id_submission
    );
    
    axios
      .put(
        `http://localhost:3000/submission/${id_submission}`,
        {
          calification: submission.calification,
          feedback: submission.feedback,
          submission_file: submission.submission_file,
          submission_comment: submission.submission_comment
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          Alerts({
            title: "Éxito",
            message: "Corrección enviada correctamente",
            icon: "success",
          });
          setEditedSubmissions((prev) =>
            prev.map((item) =>
              item.id_submission === id_submission
                ? { ...item, changed: false }
                : item
            )
          );
        }
      })
      .catch((err) =>
        Alerts({ title: "Error", message: err.response.data, icon: "error" })
      );
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarProfesor />

      {/* Main Content */}
      <div className="flex-1 flex flex-col -z-0">
        {/* Banner */}
        {Class && (
          <BannerClase
            className={Class.class_name}
            classCurso={Class.class_curso}
            classColor={Class.class_color}
            classToken={Class.class_token}
          />
        )}

        {/* Tabs and Content */}
        <div className="p-6 bg-white shadow flex-1">
          {/* Tabs */}
          <div className="flex space-x-4 border-b border-gray-300 mb-4">
            <button
              onClick={() => setActiveTab("instrucciones")}
              className={`pb-2 px-4 ${
                activeTab === "instrucciones"
                  ? "border-b-2 border-blue-500 font-semibold"
                  : ""
              }`}
            >
              Instrucciones
            </button>
            <button
              onClick={() => setActiveTab("trabajo")}
              className={`pb-2 px-4 ${
                activeTab === "trabajo"
                  ? "border-b-2 border-blue-500 font-semibold"
                  : ""
              }`}
            >
              Tareas asignadas
            </button>
          </div>

          {/* Content for each tab */}
          {activeTab === "instrucciones" ? (
             <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-800">{tarea.title}</h1>
                  <div className="mt-4">
                    <div className="flex items-center space-x-2">
                      {/* Icono de calendario */}
                      <IoCalendarNumberOutline size={24} color="#000" />
                      <span className="text-m">{tarea.deliver_until}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      {/* Icono de clipboard */}
                      <IoClipboardOutline size={24} color="#000" />
                      <span className="text-m">10/10</span>
                    </div>
                  </div>
                </div>

                <div className='border-t border-gray-200 m-auto'/>
              

              {/* Class Comments */}
              <div>
                <div className="flex flex-row items-center">
                <IoChatbubbleOutline color="#000" size={24} />
                  <h3 className="ml-2 text-2xl font-semibold text-gray-800 gap-2">
                     Comentarios
                  </h3>
                </div>
                

                {/* Display Comments */}
                <div className="mb-4 space-y-2">
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-center"
                      >
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                          {comment.user_photo.String != "" ? (
                            <img
                              src={`http://localhost:3000/${comment.user_photo.String}`}
                              className="w-12 h-12 bg-gray-300 rounded-full object-contain"
                              alt="image_profile"
                            />
                          ) : (
                            <IoPerson className="text-gray-600 text-2xl" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 font-semibold">
                            {comment.userName} -{" "}
                            {new Date(comment.time).toLocaleDateString()}{" "}
                            {new Date(comment.time).getHours() - 3}:
                            {new Date(comment.time).getMinutes()}
                          </div>
                          <p className="text-gray-800">{comment.text}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No hay comentarios</p>
                  )}
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
                    <IoPaperPlane size={20} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Tareas Asignadas</h2>

              {/* Contenedor de tareas */}
              <div className="space-y-4">
                {Submissions != "No se encontraron entregas." ? (
                  Submissions.map((submission) => (
                    <div
                      key={submission.id_submission}
                      className="p-4 bg-gray-100 rounded shadow-md flex items-start space-x-4"
                    >
                      {/* Foto del usuario */}
                      <img
                        src={`http://localhost:3000/${submission.user_photo}`}
                        alt={`${submission.user_name} ${submission.user_lastname}`}
                        className="w-16 h-16 rounded-full object-cover"
                      />

                      {/* Detalles de la entrega */}
                      <div>
                        <h3 className="text-lg font-bold">
                          {submission.user_name} {submission.user_lastname}
                        </h3>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Alias:</span>{" "}
                          {submission.user_alias || "Sin alias"}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Comentario:</span>{" "}
                          {submission.submission_comment}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">
                            Fecha de entrega:
                          </span>{" "}
                          {submission.submission_date}
                        </p>
                        <div className="mb-4">
                        <label className="font-semibold">Calificación:</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          aria-valuemin={1}
                          aria-valuemax={2}
                          value={submission.calification}
                          onChange={(e) =>
                            handleInputChange(
                              submission.id_submission,
                              "calification",
                              e.target.value
                            )
                          }
                          className="block mt-1 p-2 border rounded w-full"
                        />
                      </div>
                        <div className="mb-4">
                        <label className="font-semibold">
                          Retroalimentación:
                        </label>
                        <textarea
                          minLength="2"
                          maxLength="300"
                          value={submission.feedback}
                          onChange={(e) =>
                            handleInputChange(
                              submission.id_submission,
                              "feedback",
                              e.target.value
                            )
                          }
                          className="block mt-1 p-2 border rounded w-full"
                        />
                      </div>
                        <a
                          href={`http://localhost:3000/${submission.submission_file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline mt-2 block"
                        >
                          Descargar archivo
                        </a>
                      </div>
                      {Submissions.find(
                        (item) =>
                          item.id_submission === submission.id_submission &&
                          item.changed
                      ) && (
                        <button
                          onClick={() => handleSubmit(submission.id_submission)}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Enviar corrección
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="flex place-content-center">
                    No se han entregado trabajos todavia
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VistatareaDocente;
