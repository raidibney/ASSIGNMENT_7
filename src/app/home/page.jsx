"use client";
import { useEffect, useState } from "react";
import FriendCard from "@/components/FriendCard"; 
import { UserPlus, Loader2 } from "lucide-react";

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        setFriends(data);
        setLoading(false);
      });
  }, []);

 
  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <Loader2 size={48} className="animate-spin text-[#1a4332] mb-4" />
      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
        Loading your friendships...
      </p>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-6xl mx-auto px-6 pt-20"> 
        
        {/* --- Header Section --- */}
        <div className="text-center mb-16">
          <h1 className="text-[48px] font-black text-[#1e293b] mb-4 tracking-tight leading-tight">
            Friends to keep close in your life
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto mb-10 text-[16px] leading-relaxed">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
          
          <button className="bg-[#1a4332] hover:bg-[#2d5a47] text-white border-none rounded-xl px-10 py-4 h-auto min-h-0 normal-case font-bold text-sm flex items-center gap-2 mx-auto shadow-lg transition-all active:scale-95">
            <UserPlus size={18} /> Add a Friend
          </button>
        </div>

        {/* --- Stats Dashboard --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { label: "Total Friends", value: friends.length },
            { label: "On Track", value: friends.filter(f => f.status === "on-track").length },
            { label: "Need Attention", value: friends.filter(f => f.status !== "on-track").length },
            { label: "Interactions", value: 12 }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-slate-50">
              <div className="text-[36px] font-black text-[#1e293b] mb-1">{stat.value}</div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* --- Friends Grid Section --- */}
        <div>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[28px] font-black text-slate-800">Your Circle</h2>
              <p className="text-slate-400 text-sm font-medium">Manage your active relationships</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}