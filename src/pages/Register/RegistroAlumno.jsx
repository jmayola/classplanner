import React, { useState } from "react";
import { Link, Form } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header/Header";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../../components/Loading";
import { EyeIcon } from '@heroicons/react/24/solid';
import { EyeSlashIcon } from '@heroicons/react/24/solid';

const Alerts = withReactContent(Swal);

const RegistroAlumno = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      {isLoading && <Loading />}

      {/* Formulario de Registro de Alumnos */}
      <div className="flex flex-grow items-center justify-center p-4 md:p-10">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-[20px]">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-black text-center p-5">
              Regístrate como Alumno
            </h2>
            <p className="text-gray-500 text-base md:text-lg text-center mt-4">
              Crea una cuenta para alumnos completando los siguientes campos.
            </p>
          </div>

          <hr className="border-t border-gray-300 mt-0" /> {/* Línea divisora */}

          <Form action="/registroalumno" method="POST" className="space-y-4">
            <div className="space-y-3">
              <div>
                <input
                  id="student-name"
                  name="user_name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Nombre"
                />
              </div>
              <div>
                <input
                  id="student-lastname"
                  name="user_lastname"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Apellido"
                />
              </div>
              <div>
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
              <div className="relative">
                <input
                  id="password"
                  name="user_password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                  title="Debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial."
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
              <div className="relative">
                <input
                  id="confirm-password"
                  name="student_password_confirmation"
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
              <p>
                ¿Ya tenés una cuenta?
                <Link
                  to="/login"
                  className="font-medium text-[#005da6] hover:text-[#002746] ml-1"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
            <div className="text-sm text-center mt-6">
              <p>
                Registrarse como
                <Link
                  to="/registrodocente"
                  className="font-medium text-[#005da6] hover:text-[#002746] ml-1"
                >
                  docente.
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

export default RegistroAlumno;
export const registroAlumno = async ({ request }) => {
  const data = await request.formData();
  const submission = {
    user_mail: data.get("user_mail"),
    user_password: data.get("user_password"),
    user_name: data.get("user_name"),
    user_lastname: data.get("user_lastname"),
    user_password_confirmation: data.get("student_password_confirmation"),
    user_type: "alumno",
  };

  try {
    Alerts.fire({
      title: "Registro",
      didOpen: () => {
        Alerts.showLoading(
          axios
            .post("http://localhost:3000/register", submission)
            .then((res) => {
              if (res.status === 200 || res.status === 202) {
                return Alerts.fire({
                  title: "Registro",
                  text: "Redirigiendo...",
                  icon: "success",
                });
              }
            })
            .then(() => {
              window.location = "/login";
            })
            .catch((err) => {
              const errorMessage =
                err.response?.data || "Error en el sistema. Inténtalo más tarde.";
              return Alerts.fire({
                title: "Registro Fallido",
                text: errorMessage,
                icon: "error",
              });
            })
        );
      },
    });
  } catch (err) {
    return Alerts.fire({
      title: "Registro Fallido",
      text: "Error en el sistema. Inténtalo más tarde.",
      icon: "error",
    });
  }

  return null;
};




