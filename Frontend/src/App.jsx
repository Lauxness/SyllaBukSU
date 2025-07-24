import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/Login";
import Home from "./Pages/Home";
import { useState } from "react";
import Register from "./Pages/Register";
import LandingPage from "./Pages/LandingPage";
import COPage from "./Pages/COPage";
import DescPage from "./Pages/DescPage";
import AllInOnePage from "./Pages/AllInOnePage";
import SLOPage from "./Pages/SLOPage";
import RefreshHandler from "./Handler/RefreshHandler";
import DashboardPage from "./Pages/DashboardPage";
import AnnouncementPage from "./Pages/AnnouncementPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [role, setRole] = useState("admin");
  const ProtectedPrivateRoute = ({ element }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    if (role !== "admin") {
      console.log(role);
      return <Navigate to="/generate_description" />;
    }
    return element;
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <BrowserRouter>
      <RefreshHandler
        setIsAuthenticated={setIsAuthenticated}
        setRole={setRole}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/generate_description"
          element={<PrivateRoute element={<DescPage />} />}
        />
        <Route
          path="/generate_description/:id"
          element={<PrivateRoute element={<DescPage />} />}
        />
        <Route
          path="/generate_cos"
          element={<PrivateRoute element={<COPage />} />}
        />
        <Route
          path="/generate_cos/:id"
          element={<PrivateRoute element={<COPage />} />}
        />
        <Route
          path="/generate_slos"
          element={<PrivateRoute element={<SLOPage />} />}
        />
        <Route
          path="/generate_slos/:id"
          element={<PrivateRoute element={<SLOPage />} />}
        />
        <Route
          path="/generate_all"
          element={<PrivateRoute element={<AllInOnePage />} />}
        />
        <Route
          path="/generate_all/:id"
          element={<PrivateRoute element={<AllInOnePage />} />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedPrivateRoute element={<DashboardPage />} />}
        />
        <Route
          path="/announcements"
          element={<PrivateRoute element={<AnnouncementPage />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
