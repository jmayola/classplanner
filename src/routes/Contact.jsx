import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <>
    <Header />
    <section className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Contacto
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
          Si tienes alguna pregunta o deseas obtener más información sobre <strong className="font-semibold text-blue-600">ClassPlanner</strong>, no dudes en ponerte en contacto con nosotros. Estaremos encantados de ayudarte.
        </p>
        
        {/* Formulario de contacto */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <form action="https://formspree.io/f/mwkaewlr" method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tu nombre completo"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tu correo electrónico"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="Escribe tu mensaje aquí"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Enviar mensaje
            </button>
          </form>
        </div>

        {/* Información adicional de contacto */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 mb-4">
            O puedes contactarnos a través de nuestro correo electrónico:
          </p>
          <a
            href="mailto:soporte@classplanner.mayola.net.ar"
            className="text-blue-600 text-lg font-semibold"
          >
            soporte@classplanner.mayola.net.ar
          </a>
          <p className="text-lg text-gray-700 mt-4">
            Visítanos en: <a
              href="https://classplanner.mayola.net.ar"
              className="text-blue-600 font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              classplanner.mayola.net.ar
            </a>
          </p>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default Contact;
