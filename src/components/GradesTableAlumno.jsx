import React from "react";

const GradesTableAlumno = ({ data, tasks }) => {
  console.log(data)
  console.log(tasks)
  const alumnos = data.filter(item => item.calification !== null).map(item => item.calification);
  const grades = data.filter(item => item.calification !== null).map(item => item.calification);
  const average = grades.length > 0 ? (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(2) : "N/A";

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg mb-4">Calificaciones</h2>

      <table className="min-w-full border rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            {
              tasks.map((val,i)=>{
                return <th key={i} className="px-4 py-2 text-left">{val.title}</th>
              })
            }
            <th key={i} className="px-4 py-2 text-left">Promedio</th>
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
