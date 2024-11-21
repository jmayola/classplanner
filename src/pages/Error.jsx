import { Link, useRouteError } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
        <Header/>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full px-6" id="error-page">
        {/* Contenedor del texto */}
        <div className="flex flex-col items-center gap-4 text-left md:w-1/2 md:pr-6">
          {/* Título principal */}
          <h1 className="text-7xl md:text-8xl font-black text-black text-center md:text-left">
            OOPS!
          </h1>

          {/* Descripción del error */}
          <p className="text-xl md:text-2xl text-center text-gray-700 w-full md:w-[80%] leading-relaxed">
            No pudimos encontrar la página que estabas buscando. Quizás quieras regresar al inicio y probar de nuevo.
          </p>

          {/* Enlace de retorno */}
          <Link 
            to={"/"} 
            className="text-lg bg-[#1B264F] hover:bg-[#8EACCE] text-white px-5 py-3 rounded-full"
          >
            Volver al inicio
          </Link>
        </div>

        {/* Imagen de error */}
        <div className="w-full md:w-1/2 flex justify-center p-4">
          <img 
            src="/caricaturacomputadora.png" 
            alt="Caricatura de error" 
            className="w-[400px] md:w-[500px] object-cover" 
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
