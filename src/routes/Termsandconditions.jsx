import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto max-w-4xl bg-white p-8 shadow-lg rounded-md mt-10 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Términos y Condiciones de Uso</h1>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">1. Introducción</h2>
          <p className="text-gray-600 mb-4">
            Bienvenido a nuestra plataforma de organización de clases. Al utilizar este servicio, usted acepta cumplir con los términos y condiciones aquí descritos. Si no está de acuerdo con alguno de los términos, por favor, no utilice nuestra plataforma.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">2. Uso del Servicio</h2>
          <p className="text-gray-600 mb-4">
            Nuestra plataforma le permite organizar y gestionar clases en línea de manera efectiva. Usted es responsable de la precisión y legalidad del contenido que cargue en la plataforma.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">3. Registro y Cuenta</h2>
          <p className="text-gray-600 mb-4">
            Para utilizar nuestros servicios, deberá crear una cuenta y proporcionar información precisa y completa. Es su responsabilidad mantener la confidencialidad de su información de cuenta y notificar cualquier uso no autorizado de su cuenta.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">4. Derechos de Propiedad Intelectual</h2>
          <p className="text-gray-600 mb-4">
            Todos los derechos de propiedad intelectual relacionados con nuestra plataforma y su contenido pertenecen a nosotros o a nuestros licenciantes. Usted no puede reproducir, distribuir, o crear trabajos derivados sin nuestro permiso expreso.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">5. Limitación de Responsabilidad</h2>
          <p className="text-gray-600 mb-4">
            Nuestra responsabilidad se limita al máximo permitido por la ley. No seremos responsables de ningún daño indirecto, incidental o consecuente que resulte del uso de nuestra plataforma.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">6. Modificaciones</h2>
          <p className="text-gray-600 mb-4">
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor cuando se publiquen en esta página. Su uso continuado de nuestra plataforma después de la publicación de cambios constituye su aceptación de los nuevos términos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">7. Contacto</h2>
          <p className="text-gray-600 mb-4">
            Si tiene alguna pregunta sobre estos términos, no dude en ponerse en contacto con nosotros a través de nuestro formulario de contacto en la plataforma o por correo electrónico.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
