import { BrowserRouter, Routes, Route } from "react-router-dom"

import Landing from "../pages/Landing/Landing"
import AppWelcome from "../pages/AppWelcome/AppWelcome"
import Login from "../pages/Login/Login"

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/app"
          element={<AppWelcome />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes