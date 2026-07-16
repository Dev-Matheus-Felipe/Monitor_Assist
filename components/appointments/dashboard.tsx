"use client"

import { AppointmentType } from "@/types/appointments/appointmentsType";
import SingleAppointment from "./appointment";
import { useState } from "react"

const states: string[] = ["all", "upcoming", "completed"]

export default function AtendDashboard({
    appointments,
} : {
    appointments: AppointmentType[],
}){

    const [filter, setFilter] = useState<string>("all");
    
    return (
        <div className="flex flex-col gap-8 mt-7">

            {/* FILTERS MAP */}
            <div className="flex gap-2 flex-wrap">
                { states.map((f, index) => (
                    <button 
                    key={index + f} 
                    onClick={()=> setFilter(f)}
                    className={`px-3 py-1.5 rounded border text-sm font-mono transition-all cursor-pointer
                    ${filter == f 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "border-border bg-card text-foreground hover:border-primary/40"}`}
                    >
                        {{ all: "Todos", upcoming: "Agendados", completed: "Realizados", cancelled: "Cancelados" }[f]}
                    </button>
                ))}
            </div>

            {/* AGENDAMENTOS */}
            <div className="space-y-3">
                { appointments
                    .filter(e => e.status == filter || filter == "all")
                    .map((apt) => (
                        <SingleAppointment apt={apt} key={apt.id}/>
                    ))
                }
            </div>
        </div>
    )
}
