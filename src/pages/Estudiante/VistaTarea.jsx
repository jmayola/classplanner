import React, { useState, useEffect } from "react";
import { IoCalendarNumberOutline, IoAlertCircleOutline, IoCheckmarkDoneOutline, IoClipboardOutline, IoChatbubbleOutline, IoPaperPlane, IoPerson, IoDocumentTextOutline, IoAdd, IoAddOutline, IoChevronBack, IoAttach, IoAttachOutline, IoCheckmarkOutline, IoChevronDownOutline } from "react-icons/io5";
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
    <div className="flex max-w-screen overflow-hidden relative -z-0">
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
        <div className="space-y-4 px-5 py-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              {tarea.title}
            </h2>
            <div className="flex items-center space-x-2">
              <IoCalendarNumberOutline size={24} color="#000" />
              <span>{dueDate ? dueDate.toLocaleDateString() : "Sin Limite"}{" "}
              {dueDate && dueDate.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <IoClipboardOutline size={24} color="#000" />
              <span className="text-m">10/10</span>
            </div>
            <div className="flex flex-col items-left space-x-2">
              <div className="flex flex-row ">
                <IoDocumentTextOutline size={24} color="#000" />
                <span className="font-bold ml-2">Descripcion </span><br />
              </div>
              <p className="px-5">{tarea.description}</p>
            </div>
          </div>

          {/* Comentarios de Clase */}
          <div className="border-t pt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
              <IoChatbubbleOutline className="mr-2" /> Comentarios de clase
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
                        <IoPerson className="text-gray-600 text-2xl" />
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
                className="flex items-center px-6 py-3 bg-[#0071ae] text-white rounded-[40px] shadow-md hover:bg-[#026093]"
              >
                <IoAddOutline className="mr-2" />
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
              <IoDocumentTextOutline className="mr-2" />
              <span>Tu trabajo</span>
              <IoChevronDownOutline
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
                    <label className="px-4 py-2 border border-gray-300 text-gray-600 rounded-[40px] hover:bg-gray-100 flex items-center cursor-pointer">
                      <IoAttachOutline size={24} className="mr-2" />
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
                      <IoCheckmarkOutline className="text-xl" />
                      <p>Trabajo entregado</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4 w-full">
                  {submitted ? (
                    <>
                    <div className="flex items-center text-green-600 space-x-2">
                      <IoCheckmarkOutline className="text-xl" />
                      <p>Trabajo entregado</p>
                    </div>
                    <a href={"http://localhost:3000/"+attachment.name} className="px-4 py-2 border border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 flex items-center cursor-pointer">
                          <IoAttachOutline size={24} className="mr-2" />
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
                          className="px-4 py-2 bg-[#009c05] text-white rounded-[20px] hover:bg-[#017f05] flex items-center"
                        >
                          <IoCheckmarkOutline size={24} className="mr-2" />
                          Entregar trabajo
                        </button>
                        <label className="px-4 py-2 border border-gray-300 text-gray-600 rounded-[20px] hover:bg-gray-100 flex items-center cursor-pointer">
                          <IoAttachOutline size={24} className="mr-2" />
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
          {submitted ? null : (
           <div className="flex items-center space-x-2 mt-2">
            {taskStatus === "Asignado" && <IoClipboardOutline size={24} color="#000" />}
            {taskStatus === "Sin entregar" && (
              <IoAlertCircleOutline size={24} color="red" />
            )}
            {taskStatus === "Entregado" && <IoCheckmarkOutline size={24} color="green" />}
            {taskStatus === "Revisado" && (
              <IoCheckmarkDoneOutline size={24} color="blue" />
            )}
            <span>{taskStatus}</span>
          </div>
         
          )}
        </div>
      </div>
    </div>
  );
}

export default VistaTarea;
