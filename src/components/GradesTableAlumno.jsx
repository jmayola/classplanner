import React from "react";

const GradesTableAlumno = ({ data, tasks }) => {
  // Agrupar calificaciones por alumno
  if (!data || data.length === 0 || data == "No se encontraron entregas.") {
    return (
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-lg mb-4">Calificaciones</h2>
        <p>No hay calificaciones disponibles.</p>
      </div>
    );
  }
  const groupedData = data.reduce((acc, item) => {
    const { id_user, user_name, user_lastname, id_task, calification, status } =
      item;

    // Si el alumno no está en el acumulador, lo agregamos
    if (!acc[id_user]) {
      acc[id_user] = {
        user_name,
        user_lastname,
        grades: [],
      };
    }

    // Agregar la tarea y la calificación al alumno
    acc[id_user].grades.push({
      id_task,
      calification,
      status,
    });

    return acc;
  }, {});

  // Convertir el objeto agrupado a un array
  const studentsArray = Object.entries(groupedData).map(
    ([id_user, { user_name, user_lastname, grades }]) => ({
      id_user,
      user_name,
      user_lastname,
      grades,
    })
  );
console.log(studentsArray)
  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg mb-4">Calificaciones</h2>

      <table className="min-w-full border rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Alumno</th>
            {tasks.map((task) => (
              <th key={task.id_task} className="px-4 py-2 text-left">
                {task.title}
              </th>
            ))}
            <th className="px-4 py-2 text-left">Promedio</th>
          </tr>
        </thead>
        <tbody>
          {studentsArray.map((student) => {
            const totalGrades = student.grades.reduce(
              (acc, grade) => acc + (grade.calification || 0),
              0
            );
            const average =
              student.grades.length > 0
                ? (totalGrades / student.grades.length).toFixed(2)
                : "N/A";

            return (
              <tr key={student.id_user} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  {student.user_name} {student.user_lastname}
                </td>
                {tasks.map((task) => {
                  const studentTask = student.grades.find((g) => {
                    if (g.id_task == task.id_task) {
                      return g.calification;
                    } else {
                      return null;
                    }
                  });
                  console.log(studentTask);
                  return (
                    <td key={task.id_task} className="px-4 py-2">
                      {studentTask
                        ? studentTask.calification !== null
                          ? studentTask.calification
                          : "—"
                        : "—"}
                    </td>
                  );
                })}
                <td className="px-4 py-2 font-bold">{average}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GradesTableAlumno;
