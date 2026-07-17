import { departments } from "@/lib/generals";
import { Search } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutors | Atende Monitor",
  description:
    "Search available Tutors, view their information, and schedule tutoring appointments.",
};

export default function Loading(){
    return (
        <div className="h-full w-full flex flex-col gap-10">
            <div className="">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Monitores disponíveis</p>
                <h1 className="text-3xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Encontre um monitor</h1>
            </div>
    
            <div className="flex flex-col gap-6">

            {/* SISTEMA DE BUSCA DE MONITORES */}
            <div className="flex gap-3 flex-col md:flex-row">
                <div className="relative flex-1 min-w-5">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <div 
                    className={`w-full h-12 pl-9 pr-4 py-2.5 rounded  bg-input-background 
                    text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30`} />
                </div>

                <div className="max-sm:my-2 flex gap-2 flex-wrap max-sm:justify-center">
                  {departments.map((d) => (
                    <button
                        key={d} 
                        className={`px-3 py-2 rounded border text-sm font-mono transition-all whitespace-nowrap cursor-pointer
                        border-border bg-card text-foreground hover:border-primary/40`}>{d}</button>
                  ))}
                </div>
            </div>

            {/* EXIBIÇÃO DOS MONITORES */}
            <div className="grid gap-4 sm:grid-cols-2">
                
                <div className="bg-card rounded-lg p-5 hover:shadow-md transition-shadow h-30" />
                <div className="bg-card rounded-lg p-5 hover:shadow-md transition-shadow h-30" />
                <div className="bg-card rounded-lg p-5 hover:shadow-md transition-shadow h-30" />
            </div>
        </div>
    </div>
    )
}