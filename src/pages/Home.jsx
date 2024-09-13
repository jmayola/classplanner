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
      <div className="w-full flex-grow p-10 flex items-center justify-between">
        <div className="hero-content text-left w-[50%] mr-10 mt-10 ml-10">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-[#252525]">¡Bienvenido!</h1>
            <h1 className="text-5xl font-bold text-[#252525]">Planifica y organizá tus clases</h1>
            <p className="py-6 text-lg text-gray-900">
              Explora las posibilidades y descubre nuevas oportunidades. ¡Estamos aquí para ayudarte a crecer!
            </p>
            <button 
              className="bg-blue-500 hover:bg-[#002746] text-white font-medium py-3 px-6 rounded-[30px]"
              onClick={handleLoginRedirect}
            >
              Empezar
            </button>

            <Link to="/inicioalumno">
              <button
                className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-[30px] hover:bg-[#002746] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mt-3"
              >
                Inicio Alumno
              </button>
            </Link>
          </div>
        </div>
        <div>
          <img src="/public/ilustration.jpg" alt="Ilustración de bienvenida" className="max-w-full h-auto rounded-[30px]" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
