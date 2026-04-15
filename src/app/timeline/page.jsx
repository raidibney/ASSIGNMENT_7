"use client";
import { useInteractions } from "@/context/InteractionContext";
import { Phone, MessageSquare, Video, Users, Filter, Search } from "lucide-react";
import { useState } from "react";

export default function Timeline() {
  const { interactions } = useInteractions();
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [activeSearch, setActiveSearch] = useState(""); 


  const handleSearch = () => {
    setActiveSearch(searchQuery.toLowerCase());
  };


  const filteredInteractions = [...interactions]
    .filter((i) => {
      const matchesFilter = filter === "All" || i.type === filter;
      const matchesSearch = 
        i.friendName.toLowerCase().includes(activeSearch) || 
        i.type.toLowerCase().includes(activeSearch);
      
      return matchesFilter && matchesSearch;
    })
    .reverse();

  const getIcon = (type) => {
    switch (type) {
      case "Call": return <Phone size={20} className="text-[#1a4332]" />;
      case "Text": return <MessageSquare size={20} className="text-[#1a4332]" />;
      case "Video": return <Video size={20} className="text-[#1a4332]" />;
      case "Meetup": return <Users size={20} className="text-[#1a4332]" />;
      default: return <MessageSquare size={20} className="text-[#1a4332]" />;
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-6 py-16">
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-800 mb-8">Timeline</h1>
          
        
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search by name or type (e.g. Call)..." 
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1a4332]/20 transition-all text-sm"
                />
              </div>
          
              <button 
                onClick={handleSearch}
                className="bg-[#1a4332] text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#2d5a47] transition-all shadow-sm active:scale-95"
              >
                Search
              </button>
            </div>
            
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none appearance-none text-sm font-semibold text-slate-600 min-w-40"
              >
                <option value="All">All Activities</option>
                <option value="Call">Calls</option>
                <option value="Text">Texts</option>
                <option value="Video">Videos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Interaction Cards List */}
        <div className="space-y-4">
          {filteredInteractions.length > 0 ? (
            filteredInteractions.map((item) => (
              <div 
                key={item.id} 
                className="group bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#1a4332]/30 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-[#dcfce7] transition-colors">
                    {getIcon(item.type)}
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                      {item.type} 
                      <span className="text-slate-400 font-medium text-sm">with {item.friendName}</span>
                    </h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                      {item.date}
                    </p>
                  </div>
                </div>

              
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-red-800 font-medium">No results found for &quot;{activeSearch}&quot;</p>
              <button 
                onClick={() => {setSearchQuery(""); setActiveSearch(""); setFilter("All");}}
                className="mt-4 text-[#1a4332] text-xs font-bold uppercase underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}