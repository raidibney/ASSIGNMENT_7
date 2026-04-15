"use client";
import { useEffect, useState, use } from "react";
import Image from "next/image"; 
import { useInteractions } from "@/context/InteractionContext";
import { Phone, MessageSquare, Video, Clock, Archive, Trash2, Edit2, History, BellOff } from "lucide-react";
import Link from "next/link";

export default function FriendDetails({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { addInteraction, interactions } = useInteractions();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f) => f.id === parseInt(id));
        setFriend(found);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <span className="loading loading-spinner loading-lg text-emerald-600"></span>
    </div>
  );
  if (!friend) return <div className="p-20 text-center text-xl font-bold">Friend not found!</div>;

  const friendInteractions = interactions.filter(i => i.friendName === friend.name).reverse();

  const statusColors = {
    "overdue": "bg-red-500 text-white",
    "almost due": "bg-orange-100 text-orange-600",
    "on-track": "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Main Grid*/}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- Left Column:  --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] text-center flex flex-col items-center">
            
              <div className="relative w-28 h-28 mb-6 rounded-full overflow-hidden border-4 border-slate-50">
                <Image 
                  src={friend.picture || "/default-avatar.png"} 
                  alt={friend.name} 
                  fill 
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              
              <h1 className="text-2xl font-bold text-slate-800 mb-2">{friend.name}</h1>
              
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <span className={`px-3 py-1 rounded-full font-bold uppercase text-[10px] ${statusColors[friend.status] || "bg-slate-100 text-slate-600"}`}>
                  {friend.status.replace("-", " ")}
                </span>
                {friend.tags && friend.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full font-bold uppercase text-[10px]">
                    {tag}
                  </span>
                ))}
              </div>

             <p className="text-slate-500 italic text-sm mb-6 leading-relaxed px-4">
            &quot;{friend.bio || 'Former colleague, great mentor'}&quot;
            </p>
              <p className="text-[11px] text-slate-400 font-medium">
                Preferred: <span className="text-slate-500 uppercase">{friend.communication_preference || 'email'}</span>
              </p>
            </div>

            {/* Side Action Buttons */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 p-4 bg-white border border-slate-100 rounded-2xl text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all shadow-sm">
                <BellOff size={18}/> Snooze 2 Weeks
              </button>
              <button className="w-full flex items-center justify-center gap-2 p-4 bg-white border border-slate-100 rounded-2xl text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all shadow-sm">
                <Archive size={18}/> Archive
              </button>
              <button className="w-full flex items-center justify-center gap-2 p-4 bg-white border border-slate-100 rounded-2xl text-red-500 font-semibold text-sm hover:bg-red-50 transition-all shadow-sm">
                <Trash2 size={18}/> Delete
              </button>
            </div>
          </div>

          {/* --- Right Column: --- */}
          <div className="lg:col-span-8 space-y-6">
            
            {/*  Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Days Since Contact", val: friend.days_since_contact },
                { label: "Goal (Days)", val: friend.goal },
                { label: "Next Due", val: friend.next_due_date },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-slate-50 text-center shadow-sm">
                  <div className={`text-3xl font-black text-slate-800 ${i === 2 ? 'text-[18px]' : ''}`}>
                    {stat.val}
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            {/*  Relationship Goal Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-50 shadow-sm flex justify-between items-center relative">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Relationship Goal</h3>
                <p className="text-slate-500 text-sm mt-1">
                  Connect every <span className="font-black text-slate-800">{friend.goal} days</span>
                </p>
              </div>
              <button className="text-[10px] font-bold text-slate-400 border border-slate-200 px-4 py-1.5 rounded-xl hover:bg-slate-50 transition-all uppercase">
                Edit
              </button>
            </div>

            {/*  Quick Check-In */}
            <div className="bg-white p-10 rounded-3xl border border-slate-50 shadow-sm">
              <h3 className="font-bold text-slate-800 text-lg mb-8">Quick Check-In</h3>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: <Phone size={24}/>, label: "Call" },
                  { icon: <MessageSquare size={24}/>, label: "Text" },
                  { icon: <Video size={24}/>, label: "Video" }
                ].map((action, idx) => (
                  <button 
                    key={idx}
                    onClick={() => addInteraction(action.label, friend.name)}
                    className="flex flex-col items-center gap-3 p-8 bg-slate-50/50 rounded-2xl hover:bg-emerald-50 group transition-all"
                  >
                    <div className="text-slate-400 group-hover:text-emerald-600 transition-colors">
                      {action.icon}
                    </div>
                    <span className="font-bold text-slate-700 text-sm">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/*  Recent Interactions List */}
            <div className="bg-white p-8 rounded-3xl border border-slate-50 shadow-sm">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="font-bold text-slate-800 text-lg">Recent Interactions</h3>
                  <Link href="/timeline" className="text-[10px] font-bold text-slate-400 border border-slate-200 px-4 py-1.5 rounded-xl uppercase hover:bg-slate-50 transition-all flex items-center gap-1">
                     <History size={12}/> Full History
                  </Link>
               </div>
               <div className="space-y-6">
                  {friendInteractions.length > 0 ? (
                    friendInteractions.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b border-slate-50 pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center gap-5">
                          <div className="p-3 bg-slate-50 text-slate-500 rounded-xl">
                            {item.type === "Call" && <Phone size={18}/>}
                            {item.type === "Text" && <MessageSquare size={18}/>}
                            {item.type === "Video" && <Video size={18}/>}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{item.type}</p>
                            <p className="text-xs text-slate-400 mt-0.5">Check-in complete</p>
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">{item.date}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 bg-slate-50/30 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-slate-400 text-xs font-medium italic">No recent history logged</p>
                    </div>
                  )}
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}