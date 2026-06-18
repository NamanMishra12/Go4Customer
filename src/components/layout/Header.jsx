import {
  Bell,
  Search,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">
          <ExternalLink size={16} />
          Visit Site
        </button>

        <button className="rounded-lg p-2 hover:bg-slate-100">
          <Bell size={20} />
        </button>

        <button className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-slate-100">
          <img
            src="/avatar.png"
            alt="User"
            className="h-10 w-10 rounded-full"
          />

          <div className="text-left">
            <p className="text-sm font-medium text-slate-800">
              Admin User
            </p>

            <p className="text-xs text-slate-500">
              Super Admin
            </p>
          </div>

          <ChevronDown size={16} />
        </button>
      </div>
    </header>
  );
}