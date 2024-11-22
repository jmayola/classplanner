import React from "react";
import { IoPerson } from "react-icons/io5"; // Ícono de persona (de Ionicons)

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="loader bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
        {/* Ícono de una persona animada */}
        <div className="text-blue-500 text-5xl animate-bounce mb-6">
          <IoPerson />
        </div>
        {/* Puntos animados que cambian de color */}
        <div className="flex space-x-4">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce delay-0">
          </div>
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce delay-200">
          </div>
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce delay-400">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
