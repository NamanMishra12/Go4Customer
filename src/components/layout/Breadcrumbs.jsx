// src/components/layout/Breadcrumbs.jsx
import { useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const { pathname } = useLocation();

  const current = pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/-/g, " ");

  return (
    <div className="mb-6 text-sm text-slate-500">
      Home /{" "}
      <span className="font-medium capitalize text-slate-700">
        {current || "Dashboard"}
      </span>
    </div>
  );
}