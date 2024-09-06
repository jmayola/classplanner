import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const RegisterScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-10 space-y-8 bg-white shadow-lg rounded-[20px]">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-4xl font-semibold text-black">Registrate</h2>
          <p className='text-gray-400 text-2x1 text-center w-[300px] mt-5'>Crea una nueva cuenta completando los siguientes campos o registrate con tu cuenta de Google</p>
        </div>

        <form className="space-y-4">
          <div className="rounded-md shadow-sm space-y-3">
            <div>
              <label htmlFor="full-name" className="sr-only">
                Nombre Completo
              </label>
              <input
                id="full-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nombre Completo"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Correo Electrónico
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Correo Electrónico"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirmar Contraseña
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Confirmar Contraseña"
              />
            </div>
          </div>
          <div>
            <div className="text-sm text-center">
              <p>¿Ya tienes una cuenta? 
              <Link
                to="/login"
                className="font-medium text-[#005da6] hover:text-[#002746]"
              > Iniciá sesión
              </Link>
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-[30px] hover:bg-[#002746] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mt-3"
            >
              Registrate
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterScreen;
