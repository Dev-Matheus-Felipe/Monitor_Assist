import { addNewSlotType } from "@/components/perfil/horarios";
import { diasSemana } from "@/lib/generals";
import { Serverschedule } from "@/lib/serverFunctions/schedule";
import { Dispatch, SetStateAction, useState } from "react"
import { timeType } from "./newAtendt";
import { MonitorWithAll } from "@/types/monitor/monitorTypes";

export function formatDate({selectedDate} : {selectedDate: string}){
    const [year, month, day] = selectedDate.split("-").map(Number);
    const newDay = new Date(year, month - 1, day);

    let result = diasSemana[newDay.getDay()];
    result += `, ${newDay.toLocaleDateString("pt-Br", {
        day: "2-digit",
        month: "long"
    })}`;

    return result;
}

export default function ConfirmationStep({
    setStep,
    selectedDate,
    selectedTime,
    monitorId,
    setData
} : {
    setStep: Dispatch<SetStateAction<number>>,
    selectedDate: string,
    selectedTime: timeType,
    monitorId: string,
    setData: Dispatch<SetStateAction<MonitorWithAll | null>>
}){

    const [topic, setTopic] = useState("");

    const schedule = async() => {
        const result: addNewSlotType = await Serverschedule({selectedTime, topic, monitorId, selectedDate});
        alert(result.message);
        
        setData(null);
    }
    
    return (
        <div className="space-y-5">
            <div className="p-3 bg-secondary/50 rounded border border-secondary text-sm">
                <span className="font-mono text-muted-foreground">
                    {formatDate({selectedDate})} às {selectedTime.time}  
                </span>
            </div>
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">Assunto / dúvida</label>
                <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Descreva o que você precisa de ajuda..."
                rows={4}
                className="w-full px-3 py-2.5 rounded border border-border bg-input-background text-foreground placeholder:text-muted-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
                <p className="text-xs text-muted-foreground mt-1">{topic.length}/300 caracteres</p>
            </div>
            <div className="flex gap-3">
                <button 
                    onClick={() => setStep(1)} 
                    className={`flex-1 py-2.5 border border-border rounded font-medium text-sm  cursor-pointer
                    hover:bg-muted transition-colors`}>
                Voltar
                </button>
                <button
                onClick={() => schedule()}
                disabled={topic.trim().length < 4}
                className={`flex-1 py-2.5 bg-primary text-primary-foreground rounded font-medium text-sm 
                transition-opacity disabled:opacity-40 hover:opacity-90 cursor-pointer`}
                >
                Confirmar agendamento
                </button>
            </div>
        </div>
    )
}