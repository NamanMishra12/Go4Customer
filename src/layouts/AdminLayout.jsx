// layouts/AdminLayout.jsx

import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Breadcrumbs from "../components/layout/Breadcrumbs";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <Breadcrumbs />

          <Outlet />
        </main>
      </div>
    </div>
  );
}