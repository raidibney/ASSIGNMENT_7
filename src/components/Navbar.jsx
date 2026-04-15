"use client";
import { useState } from "react"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, BarChart3, Menu, X } from "lucide-react"; 
export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); 

  const getLinkStyle = (path) => `
    flex items-center gap-2 p-2 px-4 rounded-xl transition-all font-semibold text-sm
    ${pathname === path 
      ? "bg-[#1a4332] text-white shadow-sm" 
      : "text-slate-600 hover:bg-slate-100 hover:text-emerald-700" 
    }
  `;

  return (
    <nav className="bg-white border-b px-4 md:px-12 sticky top-0 z-50 flex justify-between items-center h-20 shadow-sm">
      {/* Logo Section */}
      <div className="flex-none">
        <Link href="/home" className="text-2xl font-black text-emerald-900 tracking-tight">
          <span className="text-blue-700">Keen</span>Keeper
        </Link>
      </div>

     
      <div className="hidden md:block flex-none">
        <ul className="flex flex-row items-center gap-4">
          <li>
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

      {/* Small Device  Toggle Button */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Small device Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b shadow-lg p-4 md:hidden animate-in fade-in slide-in-from-top-2">
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/home" className={getLinkStyle("/home")} onClick={() => setIsOpen(false)}> 
                <Home size={18} /> <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/timeline" className={getLinkStyle("/timeline")} onClick={() => setIsOpen(false)}>
                <Clock size={18} /> <span>Timeline</span>
              </Link>
            </li>
            <li>
              <Link href="/stats" className={getLinkStyle("/stats")} onClick={() => setIsOpen(false)}>
                <BarChart3 size={18} /> <span>Stats</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}