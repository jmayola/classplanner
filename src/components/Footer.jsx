import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#F5F5F3] p-6 sm:p-10 text-gray-700 border-t border-gray-300 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start">
        {/* Sección del logo y descripción */}
        <div className="lg:w-[300px] mb-6 lg:mb-0">
          <img
            className="w-40 h-auto mb-4"
            src="/logoblanco.png"
            alt="logo"
          />
          <p className="text-sm text-gray-500">
            Este sitio es una demostración. Los artículos y la información son ficticios. 
            Los pagos realizados a través de Mercado Pago son reales, pero todos los artículos 
            mostrados son solo para fines de demostración.
          </p>
        </div>

        {/* Secciones de links */}
        <div className="flex flex-col lg:flex-row w-full justify-between lg:justify-around lg:space-x-16">
          <div className="flex flex-col mb-6 lg:mb-0">
            <h3 className="text-lg font-semibold mb-3 text-gray-600">Información</h3>
            <Link to="/Envios" className="block mb-1 text-gray-500 hover:text-gray-700">Envíos</Link>
            <Link to="/Ubicacion" className="block mb-1 text-gray-500 hover:text-gray-700">Ubicación</Link>
            <Link to="/ContactUs" className="block mb-1 text-gray-500 hover:text-gray-700">Contacto</Link>
          </div>

          <div className="flex flex-col mb-6 lg:mb-0">
            <h3 className="text-lg font-semibold mb-3 text-gray-600">Productos</h3>
            <Link to="/Web" className="mb-2 text-sm text-gray-500 hover:text-gray-700">Remeras</Link>
            <Link to="/App" className="mb-2 text-sm text-gray-500 hover:text-gray-700">Pantalones</Link>
            <Link to="/Software" className="mb-2 text-sm text-gray-500 hover:text-gray-700">Accesorios</Link>
            <Link to="/Ecommerce" className="text-sm text-gray-500 hover:text-gray-700">Equipo</Link>
          </div>

          <div className="flex flex-col mb-6 lg:mb-0">
            <h3 className="text-lg font-semibold mb-3 text-gray-600">Empresa</h3>
            <Link to="/Termsandconditions" className="mb-2 text-sm text-gray-500 hover:text-gray-700">Términos y condiciones</Link>
            <Link to="/PoliticaPrivacidad" className="text-sm text-gray-500 hover:text-gray-700">Política de privacidad</Link>
          </div>

          {/* Sección de contactos y suscripción */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-3 text-gray-600">Seguinos</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com/jmayola" target="_blank" rel="noopener noreferrer">
                <img src="../../public/pngegg.png" alt="Jmayola" className="w-6 h-6"/>
              </a>
              <a href="https://github.com/abigc23" target="_blank" rel="noopener noreferrer">
                <img src="../../public/pngegg.png" alt="Abi" className="w-6 h-6"/>
              </a>
              <a href="https://github.com/Aleu79" target="_blank" rel="noopener noreferrer">
                <img src="../../public/pngegg.png" alt="Ale" className="w-6 h-6"/>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Línea divisora */}
      <div className="border-t border-gray-300 mt-6 pt-6 text-center text-xs text-gray-500">
        <p>© 2024 PowerRush. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
