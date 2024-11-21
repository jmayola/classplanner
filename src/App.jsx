import React from "react";
import {createBrowserRouter, RouterProvider, BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import ErrorPage from "./pages/Error";
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
import Logout from './pages/Logout';
import Calificaciones from "./routes/Calificaciones";
import VistaTarea from "./pages/Estudiante/VistaTarea";
import VistatareaDocente from "./pages/Docente/VistatareaDocente";
import { ClassesProvider } from "../contexts/Classes";
import AboutUs from "./routes/Aboutus";
import Contact from "./routes/Contact";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <LoginScreen />, action: loginUserAction},
    { path: "/registerscreen", element: <RegisterScreen />, errorElement: <ErrorPage /> },
    { path: "/footer", element: <Footer /> },
    { path: "/header", element: <Header /> },
    { path: "/termsandconditions", element: <TermsAndConditions />, errorElement: <ErrorPage /> },
    { path: "/privacypolicy", element: <PrivacyPolicy />, errorElement: <ErrorPage /> },
    { path: "/registrodocente", element: <RegistroDocente />, action: registroDocente  },
    { path: "/registroalumno", element: <RegistroAlumno />, action: registroAlumno },
    { path: "/inicioalumno", element: <InicioAlumno />, errorElement: <ErrorPage /> },
    { path: "/iniciodocente", element: <InicioDocente />, errorElement: <ErrorPage /> },
    { path: "/calificaciones", element: <Calificaciones />, errorElement: <ErrorPage /> },
    { path: "/vistaclase", element: <Vistaclase />, errorElement: <ErrorPage /> },
    { path: "/listaclases", element: <Listaclases />, errorElement: <ErrorPage /> },
    { path: "/vistaclasedocente", element: <VistaclaseDocente />, errorElement: <ErrorPage /> },
    { path: "/misnotas", element: <Misnotas />, errorElement: <ErrorPage /> },
    { path: "/logout", element: <Logout />, errorElement: <ErrorPage /> },
    { path: "/VistaTarea", element: <VistaTarea/>, errorElement: <ErrorPage /> },
    { path: "/VistaTareaDocente", element: <VistatareaDocente />, errorElement: <ErrorPage />},
    { path: "/about", element: <AboutUs />, errorElement: <ErrorPage /> },
    { path: "/contact", element: <Contact />, errorElement: <ErrorPage /> },
  ]);
  return (
  <>
  <ClassesProvider>
  <RouterProvider router={router} />
  </ClassesProvider>
  </>
  )
}

export default App;
