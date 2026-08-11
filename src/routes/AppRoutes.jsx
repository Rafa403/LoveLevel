import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import AppWelcome from "../pages/AppWelcome/AppWelcome";
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" 
        element={<Landing />} />

        <Route path="/app" 
        element={<AppWelcome />} />

        <Route path="/login" 
        element={<Login />} />

        <Route path="/cadastro" 
        element={<Cadastro />} />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;
