import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

import Login from "./pages/login/Login";
import Users from "./pages/home/Users";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";

import "./style.scss";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  // Layout Component
  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Redirect to login on first visit */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public routes wrapped in Layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Route>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
