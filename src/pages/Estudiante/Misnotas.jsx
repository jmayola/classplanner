import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebars/SidebarAlumno';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; 
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';


const Alerts = withReactContent(Swal);

const Misnotas = () => {
  const [subjectsData, setSubjectsData] = useState({});
  const [selectedSubject, setSelectedSubject] = useState('Matemáticas');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 
        const response = await axios.get('http://localhost:3000/misnotas'); 
        setSubjectsData(response.data);
      } catch (error) {
        const errorMessage = error.response 
          ? `No se pudieron obtener los datos correctamente. Código: ${error.response.status}` 
          : 'Error de conexión. Por favor, verifica tu red y vuelve a intentarlo.';

        Alerts.fire({
          title: <p>Error al cargar los datos</p>,
          text: errorMessage,
          icon: "error",
        });
        
        console.error('Error al obtener datos:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const calculateAverage = (grades) => {
    const validGrades = grades.filter((grade) => grade !== null);
    const total = validGrades.reduce((acc, curr) => acc + curr, 0);
    return validGrades.length > 0 ? (total / validGrades.length).toFixed(2) : 'N/A';
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Dropdown estilizado */}
        <div className="relative mb-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md flex items-center justify-between w-52"
            onClick={toggleDropdown}
          >
            {selectedSubject}
            {isDropdownOpen ? (
              <FaChevronUp className="ml-2 text-white" />
            ) : (
              <FaChevronDown className="ml-2 text-white" />
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute bg-white shadow-md rounded-md w-52 mt-2">
              {Object.keys(subjectsData).map((subject) => (
                <button
                  key={subject}
                  onClick={() => {
                    setSelectedSubject(subject);
                    toggleDropdown();
                  }}
                  className="block px-4 py-2 hover:bg-gray-200 text-gray-800 w-full text-left"
                >
                  {subject}
                </button>
              ))}
              <button
                onClick={() => {
                  setSelectedSubject('Todas');
                  toggleDropdown();
                }}
                className="block px-4 py-2 hover:bg-gray-200 text-gray-800 w-full text-left"
              >
                Todas
              </button>
            </div>
          )}
        </div>

        {/* Sección de Todas las Notas */}
        {selectedSubject === 'Todas' ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Todas las Notas</h2>

            {/* Grilla de Notas de Tareas */}
            <div className="overflow-x-auto mb-8">
              <h3 className="text-lg font-semibold mb-4">Notas de Tareas</h3>
              <table className="table-auto w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-center">Materia</th>
                    {Object.values(subjectsData)[0]?.tasks?.map((task, i) => (
                      <th key={i} className="px-4 py-2 text-center">{task}</th>
                    ))}
                    <th className="px-4 py-2 text-center">Promedio</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(subjectsData).map((subject) => (
                    <tr key={subject} className="border-t">
                      <td className="px-4 py-2 text-center font-semibold">{subject}</td>
                      {subjectsData[subject].grades.map((grade, i) => (
                        <td key={i} className="px-4 py-2 text-center">
                          {grade !== null ? (
                            <div>
                              <p>{grade}</p>
                              <p className={subjectsData[subject].entregadas[i] ? 'text-green-500' : 'text-red-500'}>
                                {subjectsData[subject].entregadas[i] ? 'Entregada' : 'No Entregada'}
                              </p>
                            </div>
                          ) : (
                            <p className="text-red-500">No Calificada</p>
                          )}
                        </td>
                      ))}
                      <td className="px-4 py-2 text-center font-semibold">
                        {calculateAverage(subjectsData[subject].grades)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sección de Exámenes */}
            <div className="overflow-x-auto mb-8">
              <h3 className="text-lg font-semibold mb-4">Notas de Exámenes</h3>
              <table className="table-auto w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-center">Materia</th>
                    <th className="px-4 py-2 text-center">Examen 1</th>
                    <th className="px-4 py-2 text-center">Examen 2</th>
                    <th className="px-4 py-2 text-center">Promedio Exámenes</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(subjectsData).map((subject) => (
                    <tr key={subject} className="border-t">
                      <td className="px-4 py-2 text-center font-semibold">{subject}</td>
                      {subjectsData[subject].exams.map((exam, i) => (
                        <td key={i} className="px-4 py-2 text-center">{exam}</td>
                      ))}
                      <td className="px-4 py-2 text-center font-semibold">
                        {calculateAverage(subjectsData[subject].exams)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sección del Cuatrimestre */}
            <div className="overflow-x-auto mb-8">
              <h3 className="text-lg font-semibold mb-4">Notas del Cuatrimestre</h3>
              <table className="table-auto w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-center">Materia</th>
                    <th className="px-4 py-2 text-center">Cuatrimestre</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(subjectsData).map((subject) => (
                    <tr key={subject} className="border-t">
                      <td className="px-4 py-2 text-center font-semibold">{subject}</td>
                      <td className="px-4 py-2 text-center font-semibold">
                        {subjectsData[subject].cuatrimestre}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Información de la materia seleccionada
          <>
            {/* Grilla de Notas de Tareas */}
            <div className="overflow-x-auto mb-8">
              <h2 className="text-xl font-semibold mb-4">Notas de Tareas en {selectedSubject}</h2>
              <table className="table-auto w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200">
                    {subjectsData[selectedSubject]?.tasks?.map((task, i) => (
                      <th key={i} className="px-4 py-2 text-center">{task}</th>
                    ))}
                    <th className="px-4 py-2 text-center">Promedio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-center font-semibold">Notas</td>
                    {subjectsData[selectedSubject]?.grades?.map((grade, i) => (
                      <td key={i} className="px-4 py-2 text-center">
                        {grade !== null ? (
                          <div>
                            <p>{grade}</p>
                            <p className={subjectsData[selectedSubject].entregadas[i] ? 'text-green-500' : 'text-red-500'}>
                              {subjectsData[selectedSubject].entregadas[i] ? 'Entregada' : 'No Entregada'}
                            </p>
                          </div>
                        ) : (
                          <p className="text-red-500">No Calificada</p>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-2 text-center font-semibold">
                      {calculateAverage(subjectsData[selectedSubject].grades)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Sección de Exámenes */}
            <div className="overflow-x-auto mb-8">
              <h2 className="text-xl font-semibold mb-4">Notas de Exámenes en {selectedSubject}</h2>
              <table className="table-auto w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-center">Examen 1</th>
                    <th className="px-4 py-2 text-center">Examen 2</th>
                    <th className="px-4 py-2 text-center">Promedio Exámenes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-center">{subjectsData[selectedSubject]?.exams[0]}</td>
                    <td className="px-4 py-2 text-center">{subjectsData[selectedSubject]?.exams[1]}</td>
                    <td className="px-4 py-2 text-center font-semibold">
                      {calculateAverage(subjectsData[selectedSubject].exams)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Sección del Cuatrimestre */}
            <div className="overflow-x-auto mb-8">
              <h2 className="text-xl font-semibold mb-4">Notas del Cuatrimestre en {selectedSubject}</h2>
              <table className="table-auto w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-center">Cuatrimestre</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-center font-semibold">
                      {subjectsData[selectedSubject]?.cuatrimestre}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Misnotas;
