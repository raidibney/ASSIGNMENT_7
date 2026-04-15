import Link from "next/link";
import Image from "next/image"; 

const FriendCard = ({ friend }) => {
  const statusColors = {
    "on-track": "bg-emerald-500 text-white",
    "overdue": "bg-red-500 text-white",
    "almost due": "bg-orange-300 text-white",
  };

  return (
    <Link href={`/friend/${friend.id}`}>
      <div className="bg-white p-8 rounded-3xl text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-white hover:shadow-md transition-shadow cursor-pointer h-full">
        {/* Optimized Image Container */}
        <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-slate-50">
          <Image
            src={friend.picture || "/default-avatar.png"}
            alt={friend.name}
            fill
            className="object-cover"
          />
        </div>

        <h3 className="font-bold text-lg text-slate-800 mb-1">{friend.name}</h3>
        <p className="text-xs text-slate-400 mb-4">{friend.days_since_contact}d ago</p>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {friend.tags?.map((tag, index) => (
            <span 
              key={index} 
              className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] uppercase font-black px-3 py-1.5 rounded-lg tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Status Badge */}
        <span className={`badge border-none font-bold capitalize px-4 py-3 h-auto rounded-full text-[10px] ${statusColors[friend.status] || "bg-slate-100 text-slate-600"}`}>
          {friend.status?.replace("-", " ")}
        </span>
      </div>
    </Link>
  );
};

export default FriendCard;