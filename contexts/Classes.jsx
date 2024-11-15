import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const ClassesContext = createContext();

function ClassesProvider({ children }) {
  const [user, setUserData] = useState({});
  const [classes, setClasses] = useState([]); 
  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user', { withCredentials: true });
      setUserData(response.data);
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };
  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/classes', { withCredentials: true });
      setClasses(await response.data ?? []);
    } catch (err) {
      throw err
    }
  };
  useEffect(() => {
    fetchUser();    
    fetchClasses();
  }, []);

  return (
    <ClassesContext.Provider value={{ classes, setClasses, user,setUserData }}>
      {children}
    </ClassesContext.Provider>
  );
}

function useClasses() {
  const context = useContext(ClassesContext);
  if (!context) {
    throw new Error("useClasses debe ser usado dentro de un ClassesProvider");
  }
  return context;
}

export { ClassesProvider, useClasses };
