"use client"

import { departments } from "@/lib/generals";
import { Search } from "lucide-react";
import { useContext, useState } from "react";
import Monitor from "./monitor";
import { MonitorWithAll } from "@/types/monitor/monitorTypes";
import { NewAppointmentContext } from "../providers/newAppointmentProvider";

export default function MonitorSearch({monitores} : {monitores: MonitorWithAll[]}){
    const context = useContext(NewAppointmentContext);
    if(!context) return null;
    
    // valor do input de pesquisa e o filtro por categoria
    const [search, setSearch] = useState("");
    const [dept, setDept] = useState("Todos");

    return (
        <div className="flex flex-col gap-6">

            {/* SISTEMA DE BUSCA DE MONITORES */}
            <div className="flex gap-3 flex-col md:flex-row">
                <div className="relative flex-1 min-w-5">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Buscar por nome ou disciplina..." 
                    className={`w-full pl-9 pr-4 py-2.5 rounded border border-border bg-input-background 
                    text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30`} />
                </div>

                <div className="max-sm:my-2 flex gap-2 flex-wrap max-sm:justify-center">
                  {departments.map((d) => (
                    <button
                        key={d} 
                        onClick={() => setDept(d)} 
                        className={`px-3 py-2 rounded border text-sm font-mono transition-all whitespace-nowrap cursor-pointer
                        ${dept === d ? "bg-primary text-primary-foreground border-primary" 
                        : "border-border bg-card text-foreground hover:border-primary/40"}`}>{d}</button>
                  ))}
                </div>
            </div>

            {/* EXIBIÇÃO DOS MONITORES */}
            <div className="grid gap-4 sm:grid-cols-2">
                { monitores
                   .filter(m => (dept === "Todos" || m.department === dept) &&
                        ( m.user.name.toLowerCase().includes(search.toLowerCase()) ||
                            (m.department ?? "").toLowerCase().includes(search.toLowerCase()) ))

                    .map((monitor) => (
                        <Monitor key={monitor.id} monitor={monitor} setData={context.setData} /> ))
                }
            </div>
        </div>
    );
}