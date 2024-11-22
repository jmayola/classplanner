import React, { useState, useEffect } from "react";
import {
  FaPaperclip,
  FaCommentDots,
  FaPlus,
  FaCheck,
  FaChevronDown,
  FaFileAlt,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import SidebarAlumno from "../../components/Sidebars/SidebarAlumno";
import BannerClase from "../../components/BannerClase";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Alerts from "../../../hooks/Alerts";
import Loading from "../../components/Loading";

function VistaTarea() {
  let { classes, user, tarea } = useLocation().state;

  const [isLoading, setIsLoading] = useState(false);
  const [classComment, setClassComment] = useState("");
  const [workComment, setWorkComment] = useState("");
  const [showClassCommentInput, setShowClassCommentInput] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [taskStatus, setTaskStatus] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [userData, setUserData] = useState({
    user_lastname: "Peña",
    user_name: "Verdun",
    user_type: "alumno",
  });
  const [dueDate, setDueDate] = useState();
  const [comments, setComments] = useState([]);
  const [Delivered, setDelivered] = useState("");

  useEffect(() => {
    setUserData(user);
    const currentDate = new Date();
    if (tarea.deliver_until != "Sin Limite") {
      setDueDate(new Date(tarea.deliver_until));
      if (currentDate <= dueDate) {
        setTaskStatus("Asignado");
      } else {
        setTaskStatus("Sin entregar");
      }
    } else {
      setDueDate(null);
      setTaskStatus("Asignado");
    }
  }, [dueDate]);

  useEffect(() => {
    getSubmission();
    getComments();
  }, []);

  const getComments = () => {
    setIsLoading(true); 
    axios
      .get("http://localhost:3000/comments?id_task=" + tarea.id_task, {
        withCredentials: true,
      })
      .then((res) => {
        setComments(res.data);
      })
      .finally(() => {
        setIsLoading(false); 
      });
  };

  const getSubmission = () => {
    setIsLoading(true); 
    axios
      .get("http://localhost:3000/submission?id_task=" + tarea.id_task, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status == 202 || res.status == 200) {
          let response = res.data;
          setAttachment({ name: response.submission_file });
          setWorkComment(response.submission_comment);
          setSubmitted(true);
        } else {
          setAttachment("");
          setWorkComment("");
          setSubmitted(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClassCommentSubmit = () => {
    if (classComment) {
      const newComment = {
        id_task: tarea.id_task,
        text: classComment,
        userName: userData.user_name,
        userLastname: userData.user_lastname,
        user_photo: {
          String: userData.user_photo,
        },
      };
      setIsLoading(true); 
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
            getComments();
            setClassComment("");
            setShowClassCommentInput(false);
          }
        })
        .catch((err) => {
          Alerts({ title: "Error", message: err.response.data, icon: "error" });
        })
        .finally(() => {
          setIsLoading(false); 
        });
    }
  };

  const formData = new FormData();
  formData.append("submission_file", attachment);
  formData.append("submission_comment", workComment);
  formData.append("id_task", tarea.id_task);

  const handleWorkSubmit = () => {
    setIsLoading(true); 
    axios
      .post("http://localhost:3000/submission", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status == 202 || res.status == 200) {
          setWorkComment("");
          setSubmitted(true);
          getSubmission();
          Alerts({
            title: "Tarea Enviada",
            message: "La tarea ha sido enviada exitosamente",
            icon: "success",
          });
        }
      })
      .catch((err) =>
        Alerts({ title: "Error", message: err.response.data, icon: "error" })
      )
      .finally(() => {
        setIsLoading(false); 
      });
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  return (
    <div className="flex min-h-screen overflow-hidden relative -z-0">
      {isLoading && <Loading />}

      {/* Sidebar */}
      <SidebarAlumno classes={classes} user={userData} />

      <div className="flex-1 overflow-y-auto relative -z-10">
        {/* Banner */}
        <BannerClase
          className={classes.class_name}
          classCurso={classes.class_curso}
          classColor={classes.class_color}
          classToken={classes.class_token}
          userName={userData.user_name}
          userLastname={userData.user_lastname}
        />

        {/* Contenido de la tarea */}
        <div className="bg-white shadow-md relative rounded-lg p-6 space-y-6 overflow-y-auto ">
          {/* Información de la Tarea */}
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-gray-900">
              {tarea.title}
            </h2>
            <p className="text-sm text-gray-500">
              Descripcion:{" "}
              {tarea.description}
            </p>
            <p className="text-sm text-gray-500">
              Vencimiento:{" "}
              {dueDate ? dueDate.toLocaleDateString() : "Sin Limite"}{" "}
              {dueDate && dueDate.toLocaleTimeString()}
            </p>
            <p className="text-sm text-gray-500">Puntos: 10</p>
          </div>

          {/* Comentarios de Clase */}
          <div className="border-t pt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
              <FaCommentDots className="mr-2" /> Comentarios de clase
            </h3>
            <div className="space-y-4 mb-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-center"
                  >
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                      {comment.user_photo.String  != "" ? (
                        <img
                          src={`http://localhost:3000/${comment.user_photo.String}`}
                          className="w-12 h-12 bg-gray-300 rounded-full object-contain"
                          alt=""
                        />
                      ) : (
                        <FaUser className="text-gray-600 text-2xl" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 font-semibold">
                        {comment.userName} - {new Date(comment.time).toLocaleDateString()} {new Date(comment.time).getHours() - 3}:{new Date(comment.time).getMinutes()}
                      </div>
                      <p className="text-gray-800">{comment.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay comentarios</p>
              )}
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
                className={`ml-2 cursor-pointer ${
                  showDetails ? "rotate-180" : ""
                }`}
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
                        accept=".pdf,.docx,.odt"
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
                    <>
                    <div className="flex items-center text-green-600 space-x-2">
                      <FaCheck className="text-xl" />
                      <p>Trabajo entregado</p>
                    </div>
                    <a href={"http://localhost:3000/"+attachment.name} className="px-4 py-2 border border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 flex items-center cursor-pointer">
                          <FaPaperclip className="mr-2" />
                          <p>{attachment.name}</p>
                        </a>
                    </>
                  ) : (
                    <div>
                      <textarea
                        value={workComment}
                        onChange={(e) => setWorkComment(e.target.value)}
                        placeholder="Detalles sobre tu trabajo (opcional)"
                        maxLength={200}
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
                          {attachment ? "Modificar Trabajo" : "Agregar Trabajo"}
                          <input
                            type="file"
                            onChange={handleAttachmentChange}
                            className="hidden"
                            accept=".pdf,.docx,.odt"
                          />
                        </label>
                        <p>{attachment ? attachment.name : null}</p>
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
            <div
              className={`text-lg font-semibold ${
                taskStatus === "Asignado" ? "text-green-600" : "text-red-600"
              }`}
            >
              {taskStatus === "Asignado" ? "Asignado" : "Sin entregar"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VistaTarea;
