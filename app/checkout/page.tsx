"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { supabase } from "@/lib/supabase";

function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bedId = searchParams.get("bed") || "Unknown";

  // Form state
  const [name, setName] = useState("");
  const [social, setSocial] = useState("");
  const [superpower, setSuperpower] = useState("I make incredible pour-over coffee ☕");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Safety check: Make sure they actually typed a name
    if (!name.trim()) {
      alert("Please enter a Traveler Name!");
      return;
    }

    setIsSubmitting(true);

    // 1. Save the new booking
    const { error: bookingError } = await supabase
      .from('bookings')
      .insert([
        { bed_id: bedId, guest_name: name, social_handle: social, superpower: superpower }
      ]);

    if (bookingError) {
      console.error("Booking error:", bookingError);
      alert("Something went wrong with the vibe check. Try again.");
      setIsSubmitting(false);
      return;
    }

    // 2. Mark the bed as booked
    const { error: bedError } = await supabase
      .from('beds')
      .update({ status: 'booked' })
      .eq('id', bedId);

    if (bedError) {
      console.error("Bed update error:", bedError);
    }

    // 3. Success!
    alert(`Success! You have locked in Bunk ${bedId}.`);
    router.push('/map');
  };

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl animate-in slide-in-from-bottom-8 duration-700">
      
      {/* Left Column: The Vibe Check Form */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">The Vibe Check</h2>
          <p className="text-slate-400">Lock in Bunk <span className="text-cyan-400 font-bold">{bedId}</span>. Let your roommates know who&apos;s coming.</p>
        </div>

        <form className="space-y-4" onSubmit={handleBooking}>
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-slate-500">Traveler Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-slate-500">Social Handle (Optional)</label>
            <input 
              type="text" 
              value={social}
              onChange={(e) => setSocial(e.target.value)}
              placeholder="@instagram_or_tiktok" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-slate-500">Your Hostel Superpower</label>
            <select 
              value={superpower}
              onChange={(e) => setSuperpower(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 appearance-none transition-all"
            >
              <option>I make incredible pour-over coffee ☕</option>
              <option>I know where the underground clubs are 🪩</option>
              <option>I have a universal adapter to share 🔌</option>
              <option>I sleep like a rock, you won&apos;t wake me 🪨</option>
            </select>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-8 py-4 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-[1.02] ${isSubmitting ? "bg-slate-700 text-slate-400 cursor-not-allowed" : "bg-cyan-500 text-slate-950 hover:bg-cyan-400"}`}
          >
            {isSubmitting ? "Locking it in..." : "Confirm & Pay $25.00"}
          </button>
        </form>
      </div>

      {/* Right Column: The "Roommate Preview" */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col">
        <h3 className="text-sm uppercase tracking-widest font-bold text-slate-500 mb-6">Who is already in the room</h3>
        
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-xl">👩‍💻</div>
            <div>
              <p className="font-bold text-slate-200">Sarah from Berlin</p>
              <p className="text-xs text-slate-400">Superpower: Knows the best Wi-Fi cafes</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-xl">🏄‍♂️</div>
            <div>
              <p className="font-bold text-slate-200">Liam from Sydney</p>
              <p className="text-xs text-slate-400">Superpower: Has an extra surfboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-cyan-900 bg-cyan-950/20 text-cyan-500">
            <div className="w-12 h-12 rounded-full border border-dashed border-cyan-500 flex items-center justify-center text-xl">👤</div>
            <div>
              <p className="font-bold text-sm">This is you!</p>
              <p className="text-xs">Claiming bunk {bedId}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#020617]">
      <Link href="/map" className="text-slate-500 hover:text-cyan-400 text-sm font-bold mb-8 transition-colors">
        ← Back to Map
      </Link>
      
      <Suspense fallback={<div className="text-cyan-500 animate-pulse">Loading Vibe Check...</div>}>
        <CheckoutForm />
      </Suspense>
    </main>
  );
}