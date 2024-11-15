import React from 'react';

function BannerClase({ className, classCurso, userName, userLastname }) {
  return (
    <div className="relative h-40 bg-blue-600">
      <div className="absolute bottom-4 left-4 text-white space-y-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{className}</h1>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{classCurso}</h3>
        <p className="text-sm sm:text-base md:text-lg">{userName} {userLastname}</p>
      </div>
    </div>
  );
}

export default BannerClase;
