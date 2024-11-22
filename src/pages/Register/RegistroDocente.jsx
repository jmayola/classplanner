import React, { useState } from 'react';
import { Form, Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header/Header';
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { EyeIcon } from '@heroicons/react/24/solid';
import { EyeSlashIcon } from '@heroicons/react/24/solid';
import Loading from '../../components/Loading';

const Alerts = withReactContent(Swal);

const RegistroDocente = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      {isLoading && <Loading />}

      {/* Formulario de Registro de Docentes */}
      <div className="flex flex-grow items-center justify-center p-4 md:p-10">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-[20px]">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-black text-center p-5">Regístrate como Docente</h2>
            <p className="text-gray-500 text-base md:text-lg text-center mt-4">
              Crea una cuenta para docentes completando los siguientes campos o registrando tu cuenta de Google.
            </p>
          </div>

          {/* Botón de inicio de sesión con Google */}
          <div className="flex justify-center">
            <button
              className="flex items-center justify-center w-full px-6 py-3 mb-4 text-sm md:text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-[30px] shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google Logo"
                className="w-5 h-5 mr-3"
              />
              <span className="flex-grow text-center">Registrarse con Google</span>
            </button>
          </div>

          <hr className="border-t border-gray-300 mt-0" />  {/* Línea divisora */}

          <Form method='POST' action='/registrodocente' className="space-y-4" >
            <div className="space-y-3">
              <div>
                <label htmlFor="teacher-name" className="sr-only">Nombre</label>
                <input
                  id="teacher-name"
                  name="user_name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Nombre"
                />
              </div>
              <div>
                <label htmlFor="teacher-lastname" className="sr-only">Apellido</label>
                <input
                  id="teacher-lastname"
                  name="user_lastname"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Apellido"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">Correo Electrónico</label>
                <input
                  id="email-address"
                  name="user_mail"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Correo Electrónico"
                />
              </div>

              {/* Contraseña */}
              <div className="relative">
                <label htmlFor="password" className="sr-only">Contraseña</label>
                <input
                  id="password"
                  name="user_password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Contraseña"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                >
                  {passwordVisible ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Confirmar Contraseña */}
              <div className="relative">
                <label htmlFor="confirm-password" className="sr-only">Confirmar Contraseña</label>
                <input
                  id="confirm-password"
                  name="user_repassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirmar Contraseña"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                >
                  {confirmPasswordVisible ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-sm text-center mt-6">
              <p>¿Ya tenés una cuenta? 
                <Link to="/login" className="font-medium text-[#005da6] hover:text-[#002746] ml-1">
                  Inicia sesión
                </Link>
              </p>
            </div>
            <div className="text-sm text-center mt-6">
              <p>Registrarse como
                <Link to="/registroalumno" className="font-medium text-[#005da6] hover:text-[#002746] ml-1">
                  alumno.
                </Link>
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm md:text-base font-medium text-white bg-blue-500 border border-transparent rounded-[30px] hover:bg-[#002746] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mt-3"
              >
                Regístrate
              </button>
            </div>
          </Form>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RegistroDocente;
export const registroDocente = async ({ request }) => {
  const data = await request.formData();
  const submission = {
    user_mail: data.get("user_mail"),
    user_password: data.get("user_password"),
    user_name: data.get("user_name"),
    user_lastname: data.get("user_lastname"),
    user_password_confirmation: data.get("user_repassword"),
    user_type: "docente"
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  if (!validatePassword(submission.user_password)) {
    return Alerts.fire({
      title: "Contraseña Inválida",
      text: "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.",
      icon: "error",
    });
  }

  if (submission.user_password !== submission.user_password_confirmation) {
    return Alerts.fire({
      title: "Contraseñas no coinciden",
      text: "Las contraseñas no coinciden, por favor revisa.",
      icon: "error",
    });
  }

  try {
    Alerts.fire({
      title: "Registrando...",
      didOpen: () => {
        Alerts.showLoading();  
        axios
          .post("http://localhost:3000/register", submission)
          .then((res) => {
            console.log(res);
            if (res.status === 200 || res.status === 202) {
              Alerts.fire({
                title: "Registro Exitoso",
                text: "Redirigiendo...",
                icon: "success",
              });
            }
          })
          .then(() => {
            window.location = "/iniciodocente";
          })
          .catch((err) => {
            Alerts.fire({
              title: "Ingreso Fallido",
              text: err.response?.data?.message || "Error al procesar la solicitud.",
              icon: "error",
            });
          });
      },
    });
  } catch (err) {
    Alerts.fire({
      title: "Error en el Sistema",
      text: "Intenta más tarde.",
      icon: "error",
    });
  }

  return null;
};

