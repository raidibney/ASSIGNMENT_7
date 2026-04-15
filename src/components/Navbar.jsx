"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, BarChart3 } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  // Helper function to define link styles
  const getLinkStyle = (path) => `
    flex items-center gap-2 p-2 px-4 rounded-xl transition-all font-semibold text-sm
    ${pathname === path 
      ? "bg-[#1a4332] text-white shadow-sm" // Updated to match your Forest Green branding
      : "text-slate-600 hover:bg-slate-100 hover:text-emerald-700" 
    }
  `;

  return (
    <nav className="bg-white border-b px-4 md:px-12 sticky top-0 z-50 flex justify-between items-center h-20 shadow-sm">
      <div className="flex-none">
        {/* Changed logo link to /home since that is your new main dashboard */}
        <Link href="/home" className="text-2xl font-black text-emerald-900 tracking-tight">
          <span className="text-blue-700">Keen</span>Keeper
        </Link>
      </div>

      <div className="flex-none">
        <ul className="flex flex-row items-center gap-4">
          <li>
            {/* FIXED: Path now matches the href exactly */}
            <Link href="/home" className={getLinkStyle("/home")}> 
              <Home size={18} /> <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/timeline" className={getLinkStyle("/timeline")}>
              <Clock size={18} /> <span>Timeline</span>
            </Link>
          </li>
          <li>
            <Link href="/stats" className={getLinkStyle("/stats")}>
              <BarChart3 size={18} /> <span>Stats</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}