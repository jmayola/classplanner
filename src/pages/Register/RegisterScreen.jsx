import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header/Header';

const RegisterScreen = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Header */}
      <Header />

      {/* Contenedor con Opciones de Registro */}
      <div className="flex flex-grow items-center justify-center mt-20">
        <div className="w-full max-w-md p-10 space-y-8 bg-white shadow-lg rounded-[20px]">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-4xl font-semibold text-black">Registro</h2>
            <p className="text-gray-400 text-2x1 text-center w-[300px] mt-5">
              Elegí si queres registrarte como Docente o como Alumno.
            </p>
          </div>

          <div className="space-y-4">
            <Link to="/registrodocente">
              <button
                className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-[30px] hover:bg-[#002746] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mt-3"
              >
                Registrarse como Docente
              </button>
            </Link>

            <Link to="/registroalumno">
              <button
                className="w-full px-6 py-3 text-sm font-medium text-white bg-[#1b9e1f] border border-transparent rounded-[30px] hover:bg-[#146316] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mt-3"
              >
                Registrarse como Alumno
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RegisterScreen;
