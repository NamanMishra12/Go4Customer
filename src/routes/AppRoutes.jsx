import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import RedirectsPage from "../pages/Redirects/RedirectsPage";
import BlogsPage from "../pages/blogs/BlogsPage";
import GlossaryPage from "../pages/glossary/GlossaryPage";
import LanguagesPage from "../pages/languages/LanguagesPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blogs" element={<BlogsPage />} />
        {/* <Route path="/redirects" element={<RedirectPage />} /> */}
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/languages" element={<LanguagesPage />} />
        <Route path="/redirects" element={<RedirectsPage />} />
      </Route>



      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}