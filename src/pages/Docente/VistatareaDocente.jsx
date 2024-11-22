import React, { useEffect, useState } from "react";
import SidebarProfesor from "../../components/Sidebars/SidebarProfesor";
import BannerClase from "../../components/BannerClase";
import { FaUser, FaPaperPlane } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Alerts from "../../../hooks/Alerts";
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
              Trabajo de los estudiantes
            </button>
          </div>

          {/* Content for each tab */}
          {activeTab === "instrucciones" ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Instrucciones</h2>

              {/* Task Details */}
              <div className="mb-6">
                <p>
                  <strong>Título de la tarea: </strong>
                  {tarea.title}
                </p>
                <p>
                  <strong>Descripcion de la tarea: </strong>
                  {tarea.description}
                </p>
                <p>
                  <strong>Vencimiento:</strong>
                  {tarea.deliver_until}
                </p>
                <p>
                  <strong>Puntos:</strong> 10
                </p>
              </div>

              {/* Attached Files */}
              {/* <div className="mb-6">
                <h3 className="text-lg font-semibold">Archivos adjuntos</h3>
                <ul className="list-disc list-inside">
                  <li>
                    <a href="/ruta/al/archivo1.pdf" className="text-blue-500">
                      Guía de estudio.pdf
                    </a>
                  </li>
                  <li>
                    <a href="/ruta/al/archivo2.docx" className="text-blue-500">
                      Formato de presentación.docx
                    </a>
                  </li>
                </ul>
              </div> */}

              {/* Class Comments */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <FaUser className="text-gray-500" /> Comentario de la clase
                </h3>

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
                            <FaUser className="text-gray-600 text-2xl" />
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
                    <FaPaperPlane size={20} />
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
