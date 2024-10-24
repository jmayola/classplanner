import React from 'react';
import SidebarProfesor from '../components/Sidebars/SidebarProfesor';

// Ejemplo de lista de tareas que vendrá de la base de datos
const tareas = [
  { id: 1, nombre: 'Tarea 1' },
  { id: 2, nombre: 'Tarea 2' },
  { id: 3, nombre: 'Tarea 3' },
];

const alumnos = [
  {
    id: 1,
    nombre: 'Alumno',
    avatar: 'https://img.daisyui.com/images/profile/demo/2@94.webp',
    tareas: {
      'Tarea 1': 'Entregada',
      'Tarea 2': '85/100',
      'Tarea 3': 'No Entregada',
    },
  },
  {
    id: 2,
    nombre: 'Alumno',
    avatar: 'https://img.daisyui.com/images/profile/demo/3@94.webp',
    tareas: {
      'Tarea 1': 'No Entregada',
      'Tarea 2': '70/100',
      'Tarea 3': 'Entregada',
    },
  },
];

const Calificaciones = () => {
  return (
    <div className="flex">
      <SidebarProfesor />
      <div className="overflow-x-auto p-6 w-full">
        <table className="table w-full border rounded-lg shadow-md bg-white">
          {/* head */}
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-4 text-left">Nombre</th>
              {/* Renderizamos las columnas de las tareas dinámicamente */}
              {tareas.map((tarea) => (
                <th key={tarea.id} className="px-6 py-4 text-left">{tarea.nombre}</th>
              ))}
              <th className="px-6 py-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Renderizamos las filas de los alumnos */}
            {alumnos.map((alumno) => (
              <tr key={alumno.id} className="border-b">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={alumno.avatar}
                          alt={`Avatar de ${alumno.nombre}`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-14">{alumno.nombre}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{alumno.pais}</td>
                {/* Renderizamos el estado de las tareas para el alumno */}
                {tareas.map((tarea) => (
                  <td key={tarea.id} className="px-6 py-4">
                    {typeof alumno.tareas[tarea.nombre] === 'number' ? (
                      <span className="badge badge-info">
                        Nota: {alumno.tareas[tarea.nombre]}
                      </span>
                    ) : (
                      <span
                        className={`badge ${
                          alumno.tareas[tarea.nombre] === 'Entregada'
                            ? 'badge-success'
                            : 'badge-error'
                        }`}
                      >
                        {alumno.tareas[tarea.nombre]}
                      </span>
                    )}
                  </td>
                ))}
                <td className="px-6 py-4">
                  <button className="btn btn-ghost btn-xs">Detalles</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calificaciones;
