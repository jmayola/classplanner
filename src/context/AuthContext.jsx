import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Hook para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);

// Componente proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ user_name: '', user_lastname: '' });

  // Función para actualizar nombre y apellido en el contexto
  const setNombreApellido = (user_name, user_lastname) => {
    setUserInfo({ user_name, user_lastname });
    console.log('Actualizando nombre y apellido:', user_name, user_lastname);
    console.log('userInfo:', { user_name, user_lastname });
  };

  return (
    <AuthContext.Provider value={{ userInfo, setNombreApellido }}>
      {children}
    </AuthContext.Provider>
  );
};
