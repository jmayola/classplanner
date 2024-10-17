import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto max-w-4xl bg-white p-8 shadow-lg rounded-md mt-10 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Política de Privacidad</h1>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">1. Introducción</h2>
          <p className="text-gray-600 mb-4">
            En ClassPlanner, nos comprometemos a proteger su privacidad. Esta política describe cómo recopilamos, usamos y protegemos su información personal cuando utiliza nuestra plataforma.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">2. Información que Recopilamos</h2>
          <p className="text-gray-600 mb-4">
            Recopilamos información personal que usted nos proporciona al registrarse en nuestra plataforma, como su nombre, correo electrónico y detalles de contacto. También podemos recopilar información sobre su uso de la plataforma para mejorar nuestros servicios.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">3. Uso de la Información</h2>
          <p className="text-gray-600 mb-4">
            Utilizamos la información recopilada para proporcionarle nuestros servicios, mejorar su experiencia y comunicarnos con usted sobre actualizaciones o cambios importantes. No compartimos su información personal con terceros sin su consentimiento, salvo que sea necesario para cumplir con la ley.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">4. Seguridad</h2>
          <p className="text-gray-600 mb-4">
            Implementamos medidas de seguridad adecuadas para proteger su información personal contra accesos no autorizados, alteraciones y divulgación. Sin embargo, ninguna transmisión de datos a través de Internet es completamente segura.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">5. Derechos del Usuario</h2>
          <p className="text-gray-600 mb-4">
            Usted tiene derecho a acceder, corregir o eliminar su información personal que tenemos en nuestra posesión. Puede contactarnos para ejercer estos derechos o si tiene alguna pregunta sobre su información personal.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">6. Cambios en la Política de Privacidad</h2>
          <p className="text-gray-600 mb-4">
            Podemos actualizar nuestra política de privacidad ocasionalmente. Cualquier cambio se publicará en esta página y entrará en vigor inmediatamente después de su publicación. Le recomendamos que revise esta página periódicamente para estar informado sobre cómo protegemos su información.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">7. Contacto</h2>
          <p className="text-gray-600 mb-4">
            Si tiene alguna pregunta o inquietud acerca de nuestra política de privacidad, no dude en ponerse en contacto con nosotros a través del formulario de contacto en nuestra plataforma o por correo electrónico.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
