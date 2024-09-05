import React from 'react';
import Sidebar from '../components/Sidebars/SidebarAlumno';
import Form from '../components/form';

function Home() {
  return (
    <div className="flex bg-[#ffffff]">
      <Sidebar />
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-6">Página de Inicio</h1>
        <Form />
      </div>
    </div>
  );
}

export default Home;
