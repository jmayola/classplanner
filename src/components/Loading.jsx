import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Spinner animado */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black border-opacity-75"></div>
      
      {/* Texto con animación */}
      <p className="mt-4 text-black text-lg ">
        Cargando...
      </p>
    </div>
  );
};

export default Loading;
