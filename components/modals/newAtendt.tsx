"use client"

import { MonitorModal } from "@/app/(logged)/monitores/@newAtendt/(.)newAtendt/[id]/page"
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react"


export default function NewAtendtModal({monitor} : {monitor: MonitorModal}){
    const [step, setStep] = useState<number>(1);
    const router = useRouter();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
                <div className="relative bg-card border border-border rounded-lg shadow-2xl w-full max-w-lg">
                    <div className="flex items-start justify-between p-6 border-b border-border">
                        <div className="flex items-center gap-3">
                            <Image 
                                src={monitor.user.image ?? ""} 
                                alt="Monitor Image" 
                                width={35} 
                                height={35}
                                className="rounded-full" 
                            />
                        <div>
                        <p className="font-medium text-foreground">{monitor.user.name}</p>
                        <p className="text-sm text-muted-foreground">{monitor.subject}</p>
                    </div>
            </div>

            <button onClick={()=> router.back()} className="p-1 hover:bg-muted rounded transition-colors cursor-pointer">
                <X className="w-4 h-4 text-muted-foreground" />
            </button>
            </div>

            <div className="flex px-6 pt-4 gap-2">
                {[1, 2].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-medium transition-colors ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        {s}
                    </div>

                    <span className={`text-xs ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                        {s === 1 ? "Horário" : "Assunto"}
                    </span>
                        {s < 2 && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
                    </div>
                ))}
            </div>

            <div className="p-6">
                {step === 1 && (
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-3">Escolha a data</label>
                            <div className="grid grid-cols-2 gap-2">
                    {/**
                     * {dates.map((d) => (
                        <button
                        key={d}
                        onClick={() => { setSelectedDate(d); setSelectedTime(""); }}
                        className={`p-3 rounded border text-left transition-all ${selectedDate === d ? "border-primary bg-secondary text-secondary-foreground" : "border-border bg-card hover:border-primary/40"}`}
                        >
                        <p className="text-xs font-mono text-muted-foreground">
                            {new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "short" }).toUpperCase()}
                        </p>
                        <p className="text-sm font-medium">
                            {new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
                        </p>
                        </button>
                    ))}
                    * 
                    */}
                            </div>
                        </div>
                {/**
                 * {selectedDate && (
                    <div>
                    <label className="block text-sm font-medium text-foreground mb-3">Horário disponível</label>
                    <div className="flex flex-wrap gap-2">
                        {availableTimes.map((t) => (
                        <button
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            className={`px-4 py-2 rounded border font-mono text-sm transition-all ${selectedTime === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/40"}`}
                        >
                            {t}
                        </button>
                        ))}
                    </div>
                    </div>
                )}
                * 
                */}
                        <button
                            className="w-full py-2.5 bg-primary text-primary-foreground rounded font-medium text-sm transition-opacity disabled:opacity-40 hover:opacity-90"
                        >
                            Continuar
                        </button>
                    </div>
                    )}
                </div>
            </div>
        </div>
  );
}