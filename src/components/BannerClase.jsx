import React from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function BannerClase({ className, classCurso, classColor }) {
  const navigate = useNavigate();

  return (
    <div className="relative h-40 bg-blue-600 -z-10" style={{ backgroundColor: classColor }}>
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-2 text-white text-2xl bg-transparent hover:bg-white hover:text-blue-600 rounded-full p-2 transition duration-200"
        aria-label="Volver"
      >
        <IoChevronBackOutline />
      </button>
      <div className="absolute bottom-4 left-4 text-white space-y-1 w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{className}</h1>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{classCurso}</h3>
      </div>
    </div>
  );
}

export default BannerClase;
