import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length === 3) {
          return '';
        }
        return prevDots + '.';
      });
    }, 500);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
      <div className="mb-4">
        <img src="/ClassPlanner10.png" alt="ClassPlanner10 Logo" className="w-48 h-auto" />
      </div>

      <div className="text-xl text-white font-semibold mt-4">
        Cargando{dots}
      </div>
      <div className="absolute bottom-10 text-white text-3xl">
        {dots}
      </div>
    </div>
  );
};

export default LoadingScreen;
