import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';  
import Header from './Header/Header';
import { useAuth } from '../context/AuthContext';


const LoginScreen = () => {

  const auth = useAuth();

  const handleGoogle = async (e) => {
    e.preventDefault();
  
    await auth.loginWithGoogle();
  
    const generateRandomToken = () => {
      return Math.random().toString(36).slice(2, 18);
    };

    const userData = {
      email: auth.user.email,
      username: auth.user.displayName,
      password: generateRandomToken(),
    };

    try {
      const response = await axios.post("http://localhost:3000/google-login", userData, { withCredentials: true });
      
      if (response.status === 200) {
        alert("Login exitoso con Google");
        window.location = response.headers.location;
      } else {
        alert("Error en el login con Google");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert("Error del servidor al procesar la solicitud");
      } else {
        alert("Error en la solicitud de login con Google");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-gray-50">
      <Header/>
      <div className="flex items-center justify-center flex-grow mt-[5%]">
        <div className="w-full max-w-md p-10 space-y-8 bg-white shadow-lg rounded-[20px]">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-4xl font-semibold text-black">Iniciar Sesión</h2>
            <p className='text-gray-400 text-2x1 text-center w-[300px] mt-5'>Inicia sesión con una cuenta ya existente o ingresá con tu cuenta de Google</p>
          </div>

          {/* Botón de inicio de sesión con Google */}
          <div className="flex justify-center">
            <button
              className="flex items-center justify-center w-full px-6 py-3 mb-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[30px] shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google Logo"
                className="w-5 h-5 mr-3"
              />
              <span className="flex-grow text-center">Iniciar sesión con Google</span>
            </button>
          </div>

          <hr className="border-t border-gray-300 mt-0" />  {/* Línea divisora */}

          <form className="space-y-4">
            <div className="rounded-md shadow-sm space-y-3">
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
                  autoComplete="current-password"
                  required
                  className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Contraseña"
                />
              </div>
            </div>

            <div className="text-sm text-center">
              <p>¿Todavía no tienes una cuenta? 
                <Link
                  to="/registerscreen"
                  className="font-medium text-[#005da6] hover:text-[#002746]"
                > Registrate                
                </Link>
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-[30px] hover:bg-[#002746] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mt-3"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoginScreen;
