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
}

export default App;
