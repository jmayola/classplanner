import React from "react";

const GradesTableAlumno = () => {
  // Datos de ejemplo
  const data = [
    { task: "Tarea 1", grade: 85, status: "Entregado" },
    { task: "Tarea 2", grade: 90, status: "Entregado" },
    { task: "Tarea 3", grade: null, status: "No entregado" },
    { task: "Tarea 4", grade: 78, status: "Entregado" },
  ];

  const grades = data.filter(item => item.grade !== null).map(item => item.grade);
  const average = grades.length > 0 ? (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(2) : "N/A";

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg mb-4">jedk</h2>

      <table className="min-w-full border rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Tarea</th>
            <th className="px-4 py-2 text-left">Calificación</th>
            <th className="px-4 py-2 text-left">Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{item.task}</td>
              <td className="px-4 py-2">{item.grade !== null ? item.grade : "—"}</td>
              <td className={`px-4 py-2 ${item.status === "Entregado" ? "text-green-600" : "text-red-600"}`}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100">
            <td className="px-4 py-2 font-bold">Promedio Total</td>
            <td className="px-4 py-2 font-bold">{average}</td>
            <td className="px-4 py-2"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default GradesTableAlumno;
