import Link from "next/link";
import { Compass, MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Compass Icon */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-[#dcfce7] rounded-full blur-2xl opacity-40 animate-pulse" />
          <div className="relative w-24 h-24 bg-white rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center">
            <Compass size={48} className="text-[#1a4332] animate-spin-slow" />
          </div>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
            404
          </span>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-3xl font-black text-[#1a4332] tracking-tight">
            Lost in the woods?
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-70 mx-auto font-medium">
            We couldnot find the page you were looking for. Lets get you back to your meaningful connections.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link 
            href="/home" 
            className="inline-flex items-center gap-2 bg-[#1a4332] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#1a4332]/20 hover:bg-[#153628] hover:-translate-y-0.5 transition-all active:scale-95"
          >
            <MoveLeft size={18} />
            Return Home
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t border-slate-100 flex justify-center gap-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
          <Link href="/timeline" className="hover:text-[#1a4332] transition-colors">Timeline</Link>
          <Link href="/stats" className="hover:text-[#1a4332] transition-colors">Stats</Link>
        </div>

      </div>
    </main>
  );
}