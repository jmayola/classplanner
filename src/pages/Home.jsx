import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';

function Home() { 
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="w-full flex-grow p-4 md:p-10 flex flex-col md:flex-row items-center justify-between">
        <div className="hero-content text-left md:w-[50%] mt-10 md:mt-0 md:ml-10">
          <div className="max-w-md">
            <h1 className="text-3xl md:text-5xl font-bold text-[#252525]">¡Bienvenido!</h1>
            <h1 className="text-3xl md:text-5xl font-bold text-[#252525]">Planifica y organizá tus clases</h1>
            <p className="py-4 md:py-6 text-base md:text-lg text-gray-900">
              Explora las posibilidades y descubre nuevas oportunidades. ¡Estamos aquí para ayudarte a crecer!
            </p>
            <Link to="/inicioalumno">
              <button 
                className="bg-blue-500 hover:bg-[#002746] text-white font-medium py-2 px-4 md:py-3 md:px-6 rounded-[30px]"
                //onClick={handleLoginRedirect}
              >
                Empezar
              </button>
            </Link>
            <Link to="/iniciodocente">
              <button 
                className="bg-blue-500 hover:bg-[#002746] text-white font-medium py-2 px-4 md:py-3 md:px-6 rounded-[30px]"
                //onClick={handleLoginRedirect}
              >
                Empezar Docente
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-6 md:mt-0">
          <img src="/ilustration.jpg" alt="Ilustración de bienvenida" className="max-w-full h-auto rounded-[30px]" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
