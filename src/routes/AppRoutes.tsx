import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import AppWelcome from "../pages/AppWelcome/AppWelcome";
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";
import Home from "../pages/Home/Home";
import Perfil from "../pages/Perfil/Perfil";
import EditarPerfil from "../pages/EditarPerfil/EditarPerfil";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" 
        element={<Landing />} />

        <Route path="/app-welcome" 
        element={<AppWelcome />} />

        <Route path="/login" 
        element={<Login />} />

        <Route path="/cadastro" 
        element={<Cadastro />} />
        
        <Route path="/home" 
        element={<Home />} />

        <Route path="/perfil" 
        element={<Perfil />} />

        <Route path="/editar-perfil" 
        element={<EditarPerfil />} />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;
