import React from 'react';
import { FaClipboard } from 'react-icons/fa'; 
import Alerts from 'sweetalert2';


const handleCopy = (classToken) => {
  navigator.clipboard.writeText(classToken)
    .then(() => {
      Alerts.fire({
        title: '¡Copiado!',
        text: `El código de clase ${classToken} ha sido copiado al portapapeles.`,
        icon: 'success'
      });
    })
    .catch((err) => {
      Alerts.fire({
        title: 'Error',
        text: 'Hubo un problema al copiar el código.',
        icon: 'error'
      });
    });
};

function BannerClase({ className, classCurso, classColor, classToken }) {
  return (
    <div className="relative h-40 bg-blue-600 -z-10" style={{backgroundColor: classColor}}>
      <div className="absolute bottom-4 left-4 text-white space-y-1 w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{className}</h1>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{classCurso}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm sm:text-base md:text-lg mr-10 flex items-center">
            Codigo de clase: {classToken}
            <FaClipboard 
              onClick={() => handleCopy(classToken)} 
              className="cursor-pointer text-blue-500 ml-2"
            />
          </p>
        </div>
      </div>
    </div>
  );
}

export default BannerClase;
