import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <>
    <Header />
    <section className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Sobre Nosotros
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <strong className="font-semibold text-blue-600">ClassPlanner</strong> es una herramienta
          innovadora diseñada para facilitar la organización y planificación de clases. Nació como el
          resultado de un proyecto personal con el objetivo de optimizar la gestión educativa de docentes
          y educadores.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          La plataforma ofrece una variedad de funcionalidades diseñadas para mejorar la eficiencia en
          la planificación, gestionando tanto recursos como tiempos de manera intuitiva y sencilla. Aunque
          los datos y ejemplos mostrados en la plataforma son ficticios, las funcionalidades y capacidades
          de <strong className="font-semibold text-blue-600">ClassPlanner</strong> son completamente reales
          y están orientadas a ofrecer una solución efectiva a los desafíos del día a día en el ámbito educativo.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Nuestro objetivo es simplificar el proceso de planificación, brindando una herramienta robusta,
          fácil de usar y adaptada a las necesidades de los profesionales de la educación.
        </p>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default AboutUs;
