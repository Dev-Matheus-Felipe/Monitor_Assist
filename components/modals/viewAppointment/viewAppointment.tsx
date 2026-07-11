"use client"

import { ViewAppointmentContext } from "@/components/providers/viewAppointmentProvider";
import { AppointmentType } from "@/types/appointments/appointmentsType";
import { GraduationCap, X } from "lucide-react";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { useContext } from "react";

export default function ViewAppointment({data} : {data: AppointmentType}){
    const context = useContext(ViewAppointmentContext);
    const {data: session } = useSession();

    if(!session || !context) return null;

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => context.setData(null)} />
        <div className="relative bg-card border border-border rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-primary px-6 py-5">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-mono text-primary-foreground/60 uppercase tracking-widest mb-1">
                            Detalhes do atendimento
                        </p>

                        <p className="text-primary-foreground font-medium text-lg leading-tight">
                            {session.user.activeProfile === "aluno" ? data.monitor.user.name : data.student.name }
                        </p>

                        <p className="text-primary-foreground/70 text-sm mt-0.5">
                            {data.topic}
                        </p>
                    </div>

                    <button onClick={() => context.setData(null)} className="p-1 text-primary-foreground/60 hover:text-primary-foreground transition-colors mt-0.5 cursor-pointer">
                        <X className="w-4 h-4" />
                    </button>
                </div>
                
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium mt-3 
                ${data.status == "completed" ? "text-muted-foreground bg-muted" : "text-secondary-foreground bg-secondary"}`}>
                {data.status}
                </div>
            </div>

            <div className="px-6 py-5 space-y-5">
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-1">Data</p>
                        <p className="text-sm font-medium text-foreground capitalize">DATA HERE</p>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-1">Horário</p>
                        <p className="text-sm font-medium text-foreground font-mono">DATA HERE</p>
                    </div>
                </div>

                {session.user.activeProfile === "aluno" && (
                <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <Image 
                        className="rounded-full"
                        src={data.monitor.user.image ?? ""} 
                        alt={"monitor image"} 
                        width={28} 
                        height={28} />

                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{data.monitor.user.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{data.monitor.department}</p>
                    </div>
                    
                    <p>{data.monitor.rating}</p>
                </div>
                )}

                {session.user.activeProfile === "monitor" && (
                <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{data.student.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">Aluno</p>
                    </div>
                </div>
                )}

                <div>
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-2">Assunto / dúvida</p>
                    <p className="text-sm text-foreground leading-relaxed bg-muted/40 rounded-lg px-4 py-3 border border-border">
                        {data.topic}
                    </p>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-1 border-t border-border">
                    <span>ID: {data.id}</span>
                    <span>Criado em DATA</span>
                </div>
            </div>
        </div>
    </div>
  );

    
}