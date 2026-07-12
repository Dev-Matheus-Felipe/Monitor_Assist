"use client"

import { getSlotsData, horarioType, slotsDataType } from "@/lib/slots";
import { MonitorWithAll } from "@/types/monitor/monitorTypes";
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react"
import ConfirmationStep from "./confirmationStep";
import { NewAppointmentContext } from "@/components/providers/newAppointmentProvider";

export type timeType = {
    time: string,
    id: string
}

export default function NewAtendtModal({monitor} : {monitor: MonitorWithAll}){
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<timeType>({time: "", id: ""});
    const [horarios, setHorarios] = useState<horarioType[]>([]);
    const [step, setStep] = useState<number>(1);
    
    const slotsData: slotsDataType[] = getSlotsData({slots: monitor.slots});

    const context = useContext(NewAppointmentContext);
    if(!context) return null;

    
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

                    <button onClick={()=> context.setData(null) } className="p-1 hover:bg-muted rounded transition-colors cursor-pointer">
                        <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>

                <div className="flex px-6 pt-4 gap-2">
                    {[1, 2].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-medium 
                        transition-colors ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
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
                        
                                    {slotsData.map((d, index) => (
                                        <button
                                        key={index}
                                        onClick={() => { 
                                            setSelectedDate(d.time); 
                                            setSelectedTime({time: "", id: ""});
                                             setHorarios(d.horarios)
                                        }}

                                        className={`p-3 rounded border text-left transition-all cursor-pointer
                                            ${selectedDate === d.time 
                                                ? "border-primary bg-secondary text-secondary-foreground" 
                                                : "border-border bg-card hover:border-primary/40"}`}
                                        >
                                        <p className="text-xs font-mono text-muted-foreground"> {d.day} </p>
                                        <p className="text-sm font-medium"> {d.time} </p>

                                        </button>
                                    ))}
                                </div>
                            </div>

                            {selectedDate && (
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-3">Horário disponível</label>
                                    <div className="flex flex-wrap gap-2">
                                        {horarios.map((t, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedTime({time: t.horario, id: t.id})}
                                            className={`px-4 py-2 rounded border font-mono text-sm transition-all cursor-pointer
                                                ${selectedTime.time === t.horario 
                                                    ? "border-primary bg-primary text-primary-foreground" 
                                                    : "border-border bg-card hover:border-primary/40"}`}
                                        >
                                            {t.horario}
                                        </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                    
                            <button
                                onClick={() => setStep(2)}
                                disabled={!selectedDate || !selectedTime}
                                className={`w-full py-2.5 bg-primary text-primary-foreground rounded font-medium 
                                text-sm transition-opacity disabled:opacity-40 hover:opacity-90 cursor-pointer`}
                            >
                                Continuar
                            </button>
                        </div>
                    )}

                    { step == 2 && 
                        <ConfirmationStep 
                            setStep={setStep}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            monitorId={monitor.id}
                            setData={context.setData}
                        /> }
                </div>
            </div>
        </div>
    );
}


