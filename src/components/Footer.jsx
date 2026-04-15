"use client";
import Link from "next/link";
import Image from "next/image"; // Import the Next.js component

export default function Footer() {
  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com", src: "/assets/instagram.png" },
    { name: "Facebook", href: "https://facebook.com", src: "/assets/facebook.png" },
    { name: "X", href: "https://twitter.com", src: "/assets/twitter.png" },
  ];

  return (
    <footer className="bg-[#1a4332] text-[#dcfce7] py-10 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter mb-2">KeenKeeper</h2>
        <p className="text-[#dcfce7]/70 text-xs md:text-sm max-w-lg mx-auto leading-relaxed mb-6 font-medium">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        
        <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-3">Social Links</h3>
        
        <div className="flex gap-4 justify-center mb-8">
          {socialLinks.map((social, idx) => (
            <Link 
              key={idx} 
              href={social.href} 
              target="_blank" 
              className="w-11 h-11 bg-white rounded-full flex items-center justify-center group hover:bg-[#dcfce7] transition-all duration-300 shadow-md active:scale-95"
            >
              <Image 
                src={social.src} 
                alt={social.name}
                width={40} // w-6 in Tailwind is 24px
                height={40} // h-6 in Tailwind is 24px
                className="group-hover:scale-110 transition-transform object-contain"
                unoptimized // This prevents the warning and extra processing
              />
            </Link>
          ))}
        </div>

        {/* Legal section same as before */}
        <div className="w-full border-t border-[#dcfce7]/10 pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] text-[#dcfce7]/60 font-medium space-y-4 md:space-y-0 tracking-tight">
          <p className="md:order-1 order-2">© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-8 justify-center items-center md:order-2 order-1 text-[11px] text-[#dcfce7]/60 font-medium capitalize tracking-tight">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}