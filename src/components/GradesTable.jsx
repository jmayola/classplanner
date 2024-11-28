import React from "react";
import { FiMoreVertical } from "react-icons/fi";

const GradesTable = () => {
  const data = [
    { name: "Promedio de la clase", grade: null },
    { name: "Ale Agüero", grade: 70 },
    { name: "Julián Ezequiel Mayola", grade: 90 },
  ];

  return (
    <table className="min-w-full bg-white border rounded-lg shadow-sm">
      <thead>
        <tr className="bg-gray-100 border-b">
          <th className="px-4 py-2 text-left">Ordenar por apellido</th>
          <th className="px-4 py-2 text-left">5 Sept</th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((student, idx) => (
          <tr
            key={idx}
            className="border-b hover:bg-gray-50 transition"
          >
            <td className="px-4 py-2">{student.name}</td>
            <td className="px-4 py-2 text-green-600">{student.grade || "—"}</td>
            <td className="px-4 py-2 text-right">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FiMoreVertical />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GradesTable;
