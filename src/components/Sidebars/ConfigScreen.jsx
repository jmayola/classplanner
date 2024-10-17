import React, { useState } from 'react';
import { FaCog, FaUser, FaBell, FaLanguage, FaKey } from 'react-icons/fa';

const ConfigScreen = () => {
  // Estados para las opciones seleccionadas
  const [appearance, setAppearance] = useState('Light');
  const [startup, setStartup] = useState('Last visited page');
  const [autoTimezone, setAutoTimezone] = useState(true);
  const [timezone, setTimezone] = useState('(GMT-03:00) America/Buenos Aires');

  // Handlers para los eventos de cambio
  const handleAppearanceChange = (e) => setAppearance(e.target.value);
  const handleStartupChange = (e) => setStartup(e.target.value);
  const handleAutoTimezoneChange = (e) => setAutoTimezone(e.target.checked);
  const handleTimezoneChange = (e) => setTimezone(e.target.value);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Izquierda */}
      <aside className="w-1/4 bg-white p-6 border-r border-gray-200">
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-300">
              {/* Aquí iría la imagen de perfil */}
            </div>
            <div>
              <p className="font-semibold text-gray-900">Rocío Gutierrez Cao</p>
              <p className="text-sm text-gray-500">rocioguticao@gmail.com</p>
            </div>
          </div>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="/account" className="flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded-lg">
                <FaUser className="mr-2 text-gray-600" />
                <span>My account</span>
              </a>
            </li>
            <li>
              <a href="/settings" className="flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded-lg">
                <FaCog className="mr-2 text-gray-600" />
                <span>My settings</span>
              </a>
            </li>
            <li>
              <a href="/notifications" className="flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded-lg">
                <FaBell className="mr-2 text-gray-600" />
                <span>My notifications</span>
              </a>
            </li>
            <li>
              <a href="/language" className="flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded-lg">
                <FaLanguage className="mr-2 text-gray-600" />
                <span>Language & region</span>
              </a>
            </li>
            <li>
              <a href="/security" className="flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded-lg">
                <FaKey className="mr-2 text-gray-600" />
                <span>Security & data</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Pantalla de Configuración */}
      <main className="w-3/4 p-8">
        <h1 className="text-2xl font-semibold mb-6">My settings</h1>
        
        {/* Sección de apariencia */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Appearance</h2>
          <p className="text-sm text-gray-500 mb-4">Customize how the app looks on your device.</p>
          <select
            value={appearance}
            onChange={handleAppearanceChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option>Light</option>
            <option>Dark</option>
          </select>
        </section>

        {/* Sección de inicio */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Startup</h2>
          <p className="text-sm text-gray-500 mb-4">Choose what to show when the app starts or when you switch workspaces.</p>
          <select
            value={startup}
            onChange={handleStartupChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option>Last visited page</option>
            <option>Home</option>
            <option>Dashboard</option>
          </select>
        </section>

        {/* Sección de fecha y hora */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Date & time</h2>
          <p className="text-sm text-gray-500 mb-4">Adjust your timezone settings.</p>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={autoTimezone}
              onChange={handleAutoTimezoneChange}
              className="mr-2"
            />
            Set timezone automatically using your location
          </label>
          {!autoTimezone && (
            <select
              value={timezone}
              onChange={handleTimezoneChange}
              className="w-full p-2 mt-4 border border-gray-300 rounded-lg"
            >
              <option>(GMT-03:00) America/Buenos Aires</option>
              <option>(GMT-04:00) America/New York</option>
              <option>(GMT+01:00) Europe/London</option>
            </select>
          )}
        </section>
      </main>
    </div>
  );
};

export default ConfigScreen;
