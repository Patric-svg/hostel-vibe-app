"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Define the shape of our bed data
interface Bed {
  id: string;
  type: string;
  price: number;
  status: string;
}

export default function MapPage() {
  const [beds, setBeds] = useState<Bed[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBed, setSelectedBed] = useState<string | null>(null);

  // Fetch beds from Supabase on load
  useEffect(() => {
    async function fetchBeds() {
      const { data, error } = await supabase
        .from('beds')
        .select('*')
        .order('id');
      
      if (error) {
        console.error("Error fetching beds:", error);
      } else {
        setBeds(data || []);
      }
      setLoading(false);
    }
    fetchBeds();
  }, []);

  const handleBedClick = (bedId: string, status: string) => {
    if (status === "booked") return;
    setSelectedBed(selectedBed === bedId ? null : bedId);
  };

  const selectedBedDetails = beds.find(b => b.id === selectedBed);

  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-[#020617] text-slate-50 font-sans">
      <div className="flex-1 p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-800">
        <div className="mb-8 text-center">
          <Link href="/" className="text-cyan-400 text-sm font-bold hover:underline mb-4 inline-block">← Back to Vibes</Link>
          <h2 className="text-3xl font-bold mb-2">Digital Nomad Dorm</h2>
          <p className="text-slate-400">Select your specific bunk bed.</p>
        </div>

        <div className="relative w-full max-w-2xl aspect-video bg-slate-900 border-2 border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 border-t-2 border-l-2 border-r-2 border-slate-800 rounded-t-lg flex items-center justify-center">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Entry</span>
          </div>

          {loading ? (
            <div className="h-full flex items-center justify-center text-cyan-500 animate-pulse">
              Loading live map...
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-24 gap-y-16 h-full p-4">
              {[1, 2, 3, 4].map((bunkGroup) => (
                <div key={bunkGroup} className="relative flex flex-col gap-2">
                  {beds.filter(b => b.id.startsWith(bunkGroup.toString())).map((bed) => {
                    const isSelected = selectedBed === bed.id;
                    const isBooked = bed.status === "booked";
                    
                    return (
                      <button
                        key={bed.id}
                        onClick={() => handleBedClick(bed.id, bed.status)}
                        disabled={isBooked}
                        className={`
                          w-full py-4 rounded-xl font-bold transition-all duration-300 relative overflow-hidden
                          ${isBooked ? "bg-slate-950 border border-slate-800 text-slate-600 cursor-not-allowed" : 
                            isSelected ? "bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-105" : 
                            "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"}
                        `}
                      >
                        {isBooked && (
                          <div className="absolute inset-0 flex items-center justify-center bg-red-950/40 backdrop-blur-[1px]">
                            <span className="text-red-500 text-xs uppercase tracking-widest rotate-12">Taken</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center px-4">
                          <span className="text-lg">{bed.id}</span>
                          <span className="text-xs uppercase tracking-wider">{bed.type}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex gap-6 mt-8 text-sm">
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-slate-800 rounded"></div> Available</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-cyan-500 rounded shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div> Selected</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-slate-950 border border-slate-800 rounded"></div> Taken</div>
        </div>
      </div>

      <div className="w-full lg:w-96 bg-slate-950 p-8 flex flex-col justify-center">
        <h3 className="text-xl font-bold mb-6 text-slate-200">Booking Summary</h3>
        
        {selectedBedDetails ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Selected Bed</p>
                  <p className="text-2xl font-bold text-cyan-400">{selectedBedDetails.id}</p>
                </div>
                <p className="text-sm font-bold text-slate-300">
                  {selectedBedDetails.type}
                </p>
              </div>
              
              <div className="h-px w-full bg-slate-800 my-4"></div>
              
              <div className="flex justify-between items-center">
                <p className="text-slate-400">Price per night</p>
                <p className="text-xl font-bold">${selectedBedDetails.price}</p>
              </div>
            </div>

            <Link 
              href={`/checkout?bed=${selectedBedDetails.id}`}
              className="w-full py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] text-center block"
            >
              Proceed to Vibe Check →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed text-slate-500">
            <p>Click an available bed on the map</p>
            <p>to see your summary.</p>
          </div>
        )}
      </div>
    </main>
  );
}