import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white h-[80px] p-4 text-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        
        {/* Logo a la izquierda */}
        <div className="flex items-left">
          <Link to="/">
            <img
              src="/ClassPlanner1.png" 
              alt="Logo"
              className="w-[130px] h-auto"
            />
          </Link>
        </div>
        
        {/* Categorías a la derecha del logo */}
        <nav className="flex space-x-6 ml-4">
          <Link to="/" className="text-black hover:text-gray-700">Inicio</Link>
          <Link to="/about" className="text-black hover:text-gray-700">Sobre nosotros</Link>
          <Link to="/contact" className="text-black hover:text-gray-700">Contacto</Link>
        </nav>

        {/* Botones de Inicio de sesión y Registro a la derecha */}
        <div className="flex items-center space-x-5">
          <Link to="/login" className="text-center justify-center text-white hover:bg-gray-700 bg-[#151515] rounded-[30px] h-[30px] flex items-center">
            <span className="px-5">Iniciar sesión</span>
          </Link>
          <Link to="/registerscreen" className="text-black hover:bg-gray-200 text-center justify-center rounded-[30px] h-[30px] flex items-center">
            <span className="px-5">Registro</span>
          </Link>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
