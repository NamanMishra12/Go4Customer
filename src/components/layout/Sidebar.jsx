import { NavLink } from "react-router-dom";
import { sidebarConfig } from "../../constants/sidebarConfig";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
  <div className="flex h-16 items-center border-b border-slate-200 px-6">
    <h1 className="text-3xl font-bold text-slate-900">
      Go4Customer
    </h1>
  </div>

      <div className="flex-1 overflow-y-auto p-4">
        {sidebarConfig.map((section) => (
          <div key={section.section} className="mb-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {section.section}
            </p>

            <nav className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100"
                      }`
                    }
                  >
                    <Icon size={18} />
                    <span>{item.title}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}