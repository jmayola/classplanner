import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#F5F5F3] p-6 sm:p-10 text-[#252525] mt-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start">
        {/* Sección del logo y descripción */}
        <div className="lg:w-[300px] mb-6 lg:mb-0 flex flex-col items-center lg:items-start">
          <img
            className="w-[120px] h-auto"
            src="/ClassPlanner1.png"
            alt="logo"
          />
          <p className="text-sm text-gray-600 mt-4 text-center lg:text-left">
            ClassPlanner es una herramienta diseñada para ayudar en la organización y planificación de clases.
          </p>
        </div>

        {/* Secciones de links */}
        <div className="flex flex-col lg:flex-row w-full lg:justify-around">
          <div className="flex flex-col mb-6 lg:mb-0">
            <h3 className="text-lg font-semibold mb-3 text-[#252525]">Información</h3>
            <Link to="/ContactUs" className="mb-2 text-sm text-gray-600 hover:text-gray-800">Contacto</Link>
            <Link to="/Termsandconditions" className="mb-2 text-sm text-gray-600 hover:text-gray-800">Términos y condiciones</Link>
            <Link to="/PrivacyPolicy" className="text-sm text-gray-600 hover:text-gray-800">Política de privacidad</Link>
          </div>

          <div className="flex flex-col mb-6 lg:mb-0">
            <h3 className="text-lg font-semibold mb-3 text-[#252525]">Productos</h3>
            <Link to="/Web" className="mb-2 text-sm text-gray-600 hover:text-gray-800">Remeras</Link>
            <Link to="/App" className="mb-2 text-sm text-gray-600 hover:text-gray-800">Pantalones</Link>
            <Link to="/Software" className="mb-2 text-sm text-gray-600 hover:text-gray-800">Accesorios</Link>
            <Link to="/Ecommerce" className="text-sm text-gray-500 hover:text-gray-800">Equipo</Link>
          </div>

          {/* Sección de contactos y suscripción */}
          <div className="flex flex-col mb-6 lg:mb-0">
            <h3 className="text-lg font-semibold mb-3 text-[#252525]">Seguinos</h3>
            <div className="flex space-x-4 justify-center lg:justify-start">
              <a href="https://github.com/jmayola" target="_blank" rel="noopener noreferrer">
                <img src="/github.png" alt="Jmayola" className="w-6 h-6"/>
              </a>
              <a href="https://github.com/abigc23" target="_blank" rel="noopener noreferrer">
                <img src="/github.png" alt="Abi" className="w-6 h-6"/>
              </a>
              <a href="https://github.com/Aleu79" target="_blank" rel="noopener noreferrer">
                <img src="/github.png" alt="Ale" className="w-6 h-6"/>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Línea divisora */}
      <div className="border-t border-gray-300 mt-6 pt-6 text-center text-xs text-gray-800">
        <p>© 2024 ClassPlanner. Todos los derechos reservados.</p>
      </div>

      <div className="mt-6 text-sm text-gray-600 text-center">
        <p>
          ClassPlanner es una herramienta diseñada para ayudar en la organización y planificación de clases. 
          Es el resultado de un proyecto personal. La información y los recursos disponibles en la plataforma 
          están destinados a demostrar sus capacidades. Aunque los datos y ejemplos mostrados son ficticios, 
          las funcionalidades ofrecidas son reales y están orientadas a facilitar la gestión educativa.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
