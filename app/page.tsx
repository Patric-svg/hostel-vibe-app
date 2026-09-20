import Link from "next/link";
export default function Home() {
  const vibes = [
    {
      title: "Digital Nomads",
      icon: "💻",
      desc: "Fast Wi-Fi, quiet hours strictly enforced, and ergonomic chairs in the adjacent lounge.",
      color: "from-blue-500/10 to-cyan-500/10",
      border: "border-blue-500/30",
      glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
      textColor: "text-blue-400"
    },
    {
      title: "Party Animals",
      icon: "🪩",
      desc: "Pre-drinks at the bar, no judgment for rolling in at 3 AM. High energy, very social.",
      color: "from-purple-500/10 to-pink-500/10",
      border: "border-purple-500/30",
      glow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]",
      textColor: "text-purple-400"
    },
    {
      title: "Early Risers",
      icon: "🌅",
      desc: "Lights out by 10 PM. Perfect for surfers, hikers, and morning yoga enthusiasts.",
      color: "from-orange-500/10 to-yellow-500/10",
      border: "border-orange-500/30",
      glow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]",
      textColor: "text-orange-400"
    }
  ];

  return (
    <main className="min-h-screen flex flex-col items-center p-6 pt-24 pb-24">
      
      {/* Hero Content */}
      <div className="text-center max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="inline-block mb-4 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium tracking-wide">
          📍 The world&apos;s first mood-based booking system
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Find Your Tribe. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Book Your Vibe.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
         Stop guessing who you&apos;ll share a room with. Choose your bunk based on the energy you want—Digital Nomads, Party Animals, or Early Risers.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-slate-950 font-bold py-4 px-8 rounded-xl hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Explore the Vibes
          </button>
        <Link href="/map" className="bg-slate-900 border border-slate-800 text-white font-bold py-4 px-8 rounded-xl hover:bg-slate-800 transition-all text-center">
            Hostel Map
        </Link>
        </div>
      </div>

      {/* Vibe Selection Grid */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {vibes.map((vibe, index) => (
          <div 
            key={index} 
            className={`group relative p-8 rounded-2xl border ${vibe.border} bg-gradient-to-br ${vibe.color} backdrop-blur-sm cursor-pointer transition-all duration-300 hover:-translate-y-2 ${vibe.glow}`}
            style={{ animation: `fadeIn 0.5s ease-out forwards ${(index + 1) * 0.2}s`, opacity: 0 }}
          >
            <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
              {vibe.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{vibe.title}</h3>
            <p className="text-slate-400 leading-relaxed mb-8">{vibe.desc}</p>
            
            <div className={`absolute bottom-8 left-8 flex items-center text-sm font-bold ${vibe.textColor} group-hover:translate-x-2 transition-transform duration-300`}>
              View Rooms <span className="ml-2">→</span>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}