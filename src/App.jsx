import React from "react";
import {createBrowserRouter, RouterProvider, BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import LoginScreen,{ loginUserAction } from "./pages/Login/LogIn";
import RegisterScreen from "./pages/Register/RegisterScreen";
import RegistroDocente, { registroDocente } from "./pages/Register/RegistroDocente";
import RegistroAlumno, { registroAlumno } from "./pages/Register/RegistroAlumno";
import Footer from "./components/Footer";
import TermsAndConditions from "./routes/Termsandconditions";
import PrivacyPolicy from './routes/Privacypolc';
import InicioAlumno from './pages/Estudiante/InicioAlumno';
import InicioDocente from './pages/Docente/InicioDocente';
import Misnotas from './pages/Estudiante/Misnotas';
import Vistaclase from './pages/Estudiante/Vistaclase';
import VistaclaseDocente from './pages/Docente/VistaclaseDocente';
import Listaclases from './pages/Docente/Listaclases';
import Calificaciones from "./routes/Calificaciones";


function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <LoginScreen />, action: loginUserAction},
    { path: "/registerscreen", element: <RegisterScreen /> },
    { path: "/footer", element: <Footer /> },
    { path: "/header", element: <Header /> },
    { path: "/termsandconditions", element: <TermsAndConditions /> },
    { path: "/privacypolicy", element: <PrivacyPolicy /> },
    { path: "/registrodocente", element: <RegistroDocente />, action: registroDocente  },
    { path: "/registroalumno", element: <RegistroAlumno />, action: registroAlumno },
    { path: "/inicioalumno", element: <InicioAlumno /> },
    { path: "/iniciodocente", element: <InicioDocente /> },
    { path: "/calificaciones", element: <Calificaciones /> },
    { path: "/vistaclase", element: <Vistaclase /> },
    { path: "/listaclases", element: <Listaclases /> },
    { path: "/vistaclasedocente", element: <VistaclaseDocente /> },
    { path: "/misnotas", element: <Misnotas /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
