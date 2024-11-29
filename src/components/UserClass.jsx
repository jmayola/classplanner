import React, { useState,useEffect } from 'react';
import { IoPersonOutline,IoPerson } from 'react-icons/io5';

const UserClass = ({ users }) => {
    // Filtrar los usuarios por tipo
    const [students,setStudents] = useState([])
    const [teachers,setTeachers] = useState([])
    useEffect(()=>{
        try{
            if(users.length >1){
                setStudents(users.filter(user => user.user_type === 'alumno'))
                setTeachers(users.filter(user => user.user_type === 'docente'))
            }
        }
        catch(err){
            console.log(err)
        }
    },[])

    return (
        <div className="container mx-auto mt-8">
            {/* Lista de Alumnos */}
            {students.length > 0 && (
                <div className="p-4 bg-white rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4">Lista de Alumnos</h2>
                    <ul className="space-y-4">
                        {students.map((student, index) => (
                            <li key={index} className="flex items-center p-3 border rounded-lg hover:bg-gray-100 transition duration-200">
                                {student.user_photo != "" ? <img 
                                    src={"http://localhost:3000/"+student.user_photo} 
                                    alt={`${student.user_name} ${student.user_lastname}`} 
                                    className="w-12 h-12 rounded-full mr-4"
                                /> : (
                                    <IoPerson className="text-gray-600 w-12 h-12 rounded-full mr-4" />
                                  )}
                                
                                <div className="flex-grow">
                                    <h3 className="text-lg font-medium">{student.user_name} {student.user_lastname}</h3>
                                </div>
                                <IoPersonOutline className="text-gray-500 w-6 h-6" />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Lista de Docentes */}
            {teachers.length > 0 && (
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Lista de Docentes</h2>
                    <ul className="space-y-4">
                        {teachers.map((teacher, index) => (
                            <li key={index} className="flex items-center p-3 border rounded-lg hover:bg-gray-100 transition duration-200">
                                <img 
                                    src={teacher.user_photo} 
                                    alt={`${teacher.user_name} ${teacher.user_lastname}`} 
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div className="flex-grow">
                                    <h3 className="text-lg font-medium">{teacher.user_name} {teacher.user_lastname}</h3>
                                </div>
                                <IoPersonOutline className="text-gray-500 w-6 h-6" />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserClass;