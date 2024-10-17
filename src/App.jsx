import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./pages/Home";
import LoginScreen,{ loginUserAction } from "./pages/Login/LogIn";
import RegisterScreen from "./pages/Register/RegisterScreen";
import RegistroDocente, { registroDocente } from "./pages/Register/RegistroDocente";
import RegistroAlumno, { registroAlumno } from "./pages/Register/RegistroAlumno";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import TermsAndConditions from "./routes/Termsandconditions";
import PrivacyPolicy from "./routes/Privacypolc";
import InicioAlumno from "./pages/InicioAlumno";
import InicioDocente from "./pages/InicioDocente";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginScreen from './pages/Login/LogIn';
import RegisterScreen from './pages/Register/RegisterScreen';
import RegistroDocente from './pages/Register/RegistroDocente';
import RegistroAlumno from './pages/Register/RegistroAlumno';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import TermsAndConditions from './routes/Termsandconditions';
import PrivacyPolicy from './routes/Privacypolc';
import InicioAlumno from './pages/Estudiante/InicioAlumno';
import InicioDocente from './pages/Docente/InicioDocente';
import Misnotas from './pages/Estudiante/Misnotas';
import Vistaclase from './pages/Vistaclase';
import Listaclases from './pages/Docente/Listaclases';


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
  ]);
  return <RouterProvider router={router} />;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/registerscreen" element={<RegisterScreen />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/header" element={<Header />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/registrodocente" element={<RegistroDocente />} />
        <Route path="/registroalumno" element={<RegistroAlumno />} />
        <Route path="/inicioalumno" element={<InicioAlumno />}/>
        <Route path="/iniciodocente" element={<InicioDocente />}/>
        <Route path="/misnotas" element={<Misnotas />}/>
        <Route path="/vistaclase" element={<Vistaclase />}/>
        <Route path="/listaclases" element={<Listaclases />}/>
      </Routes>
    </Router>
  );
}

export default App;
