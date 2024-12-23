import axios from 'axios'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import Alerts from 'sweetalert2';

function AgregarClase({ id_class, setTarea, tareas }) { 
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [Title, setTitle] = useState("")
  const [Desc, setDesc] = useState("")
  const [Deliver, setDeliver] = useState("")
  const handleAddTask = () => {
    setIsFormVisible(true)
  }

  const handleCloseTask = () => {
    setIsFormVisible(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let data = {
      id_class: id_class,
      title: Title,
      description: Desc,
      deliver_until: Deliver
    };
    console.log(data)
    axios.post("http://localhost:3000/tasks", data, { withCredentials: true })
      .then((res) => {
        if (res.status === 200 || res.status === 202) {
          console.log("Tarea agregada:", res.data);
  
          setTarea(prevTareas => [...prevTareas, res.data]);
  
          Alerts.fire({
            title: 'Tarea agregada',
            icon: 'success',
          });
          window.location.reload()
        } else {
          Alerts.fire({
            title: 'Error',
            text: `No se pudo crear la tarea`,
            icon: 'error',
          });
        }
      })
      .catch((err) => {
        Alerts.fire({
          title: 'Error',
          text: `No se pudo crear la tarea`,
          icon: 'error',
        });
      });
  
    setDesc("");
    setTitle("");
    setDeliver("");
  };
  
  return (
    <div>
      <button
        onClick={handleAddTask}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-md hover:bg-blue-700"
      >
        <FaPlus className="text-2xl" />
      </button>

      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-md p-10 space-y-8 bg-white shadow-lg rounded-[20px]">
            <h2 className="text-4xl font-semibold text-black text-center">Agregar Tarea</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label htmlFor="titulo" className="sr-only">Titulo</label>
                  <input
                    type="text"
                    id="titulo"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Titulo"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="desc" className="sr-only">Descripcion</label>
                  <input
                    type="text"
                    id="desc"
                    value={Desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Descripcion"
                    required
                  />
                </div>

                <div className="flex flex-row">
                  <input
                    type="date"
                    id="date"
                    value={Deliver}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDeliver(e.target.value)}
                    className="block w-full px-4 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <input
                  type='submit'
                  value={"Crear Tarea"}
                  className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-[30px] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleCloseTask}
                  className="w-full px-6 py-3 text-sm font-medium text-red-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AgregarClase;
