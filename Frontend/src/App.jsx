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
import CheckiListPage from "./Pages/CheckListPage";
import GuidePage from "./Pages/GuidePage";
import DatasetPage from "./Pages/DatasetPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const data = localStorage.getItem("user-info");
  const userInfo = JSON.parse(data);
  const [role, setRole] = useState(userInfo?.role);
  const RequireAuth = ({ children, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(role)) {
      if (role !== "admin") {
        return <Navigate to="/generate_description" replace />;
      } else {
        return <Navigate to="/dashboard" replace />;
      }
    }

    return children;
  };

  return (
    <BrowserRouter>
      <RefreshHandler
        setIsAuthenticated={setIsAuthenticated}
        setRole={setRole}
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <LoginPage
              setIsAuthenticated={setIsAuthenticated}
              setRole={setRole}
            />
          }
        />
        <Route path="/register" element={<Register />} />

        {/* Shared Routes (Admin + User) */}
        <Route
          path="/home"
          element={
            <RequireAuth allowedRoles={["admin", "college-admin", "user"]}>
              <Home />
            </RequireAuth>
          }
        />

        <Route
          path="/generate_description"
          element={
            <RequireAuth allowedRoles={["college-admin", "user"]}>
              <DescPage />
            </RequireAuth>
          }
        />

        <Route
          path="/generate_description/:id"
          element={
            <RequireAuth allowedRoles={["college-admin", "user"]}>
              <DescPage />
            </RequireAuth>
          }
        />

        <Route
          path="/generate_cos"
          element={
            <RequireAuth allowedRoles={["college-admin", "user"]}>
              <COPage />
            </RequireAuth>
          }
        />

        <Route
          path="/generate_cos/:id"
          element={
            <RequireAuth allowedRoles={["college-admin", "user"]}>
              <COPage />
            </RequireAuth>
          }
        />

        <Route
          path="/generate_slos"
          element={
            <RequireAuth allowedRoles={["college-admin", "user"]}>
              <SLOPage />
            </RequireAuth>
          }
        />

        <Route
          path="/generate_slos/:id"
          element={
            <RequireAuth allowedRoles={["college-admin", "user"]}>
              <SLOPage />
            </RequireAuth>
          }
        />

        <Route
          path="/generate_all"
          element={
            <RequireAuth allowedRoles={["college-admin", "user"]}>
              <AllInOnePage />
            </RequireAuth>
          }
        />

        <Route
          path="/generate_all/:id"
          element={
            <RequireAuth allowedRoles={["college-admin", "user"]}>
              <AllInOnePage />
            </RequireAuth>
          }
        />

        <Route
          path="/announcements"
          element={
            <RequireAuth allowedRoles={["college-admin", "admin", "user"]}>
              <AnnouncementPage />
            </RequireAuth>
          }
        />

        <Route
          path="/guides"
          element={
            <RequireAuth allowedRoles={["college-admin", "user"]}>
              <GuidePage />
            </RequireAuth>
          }
        />

        <Route
          path="/checklist"
          element={
            <RequireAuth allowedRoles={["college-admin", "user"]}>
              <CheckiListPage />
            </RequireAuth>
          }
        />

        {/* Admin Only Routes */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <DashboardPage />
            </RequireAuth>
          }
        />

        <Route
          path="/datasets"
          element={
            <RequireAuth allowedRoles={["admin", "college-admin"]}>
              <DatasetPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
