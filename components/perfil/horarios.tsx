"use client"

import { ALL_TIMES } from "@/lib/generals";
import { addNewSlots } from "@/lib/serverFunctions/addNewSlots";
import { serverRemoveSlot } from "@/lib/serverFunctions/removeSlot";
import { getSlotsData, slotsDataType } from "@/lib/slots";
import { MonitorWithSlots } from "@/types/monitor/monitorTypes";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


// response newSlot Type
export type addNewSlotType = {
    status: boolean,
    message: string
}

// pegar data
function getDate({date} : {date: Date}){
    return date.toISOString().split("T")[0];
}


export default function Horarios({monitor} : {monitor: MonitorWithSlots }){
    const [adding, setAdding] = useState(false);
    const [newDate, setNewDate] = useState("");

    const [newTimes, setNewTimes] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        if(newDate && monitor.slots.find(e => getDate({date: e.date}) == newDate)){
            setNewDate("");
            alert("Data ja cadastrada");
        }
        

    }, [newDate]);

    // adicionar novo horário 
    const addSlot = async() => {
        const result: addNewSlotType = await addNewSlots({newDate, newTimes});

        if(result.status){
            router.refresh();
            setAdding(false);
        }
    }

    // remover horário
    const removeSlot = async(id: string[]) => {
        setLoading(true);

        await serverRemoveSlot({id, monitorId: monitor.id});
        router.refresh();

        setLoading(false);
    }

    const slotsData: slotsDataType[] = getSlotsData({slots: monitor.slots});

    return (    
        <div className="bg-card border border-border rounded-lg p-6 mt-10">

            {/* HEADER*/}
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-medium text-foreground">Horários disponíveis</h3>
                {!adding && (
                <button
                    onClick={() => setAdding(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 bg-primary cursor-pointer
                    text-primary-foreground rounded text-sm font-medium hover:opacity-90 transition-opacity`}
                >
                    <Plus className="w-3.5 h-3.5" />
                    Adicionar dia
                </button>
                )}

            </div>
            
            {/* EXIBIR TELA PARA CRIAR NOVO HORÁRIO */}
            {adding &&
            <div className="mb-5 p-4 border border-primary/30 bg-secondary/20 rounded-lg space-y-4">
                <p className="text-sm font-medium text-foreground">Novo dia de atendimento</p>

                <div>
                    <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wide mb-1.5">Data</label>
                    <input
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    type="date"
                    className=" cursor-pointer px-3 py-2 rounded border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                    />
                </div>

                <div>
                    <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wide mb-2">Horários</label>
                    {/* EXIBIR TODAS AS OPÇÕES DE HORÁRIOS PARA CRIAR */}
                    <div className="flex flex-wrap gap-2">
                    {ALL_TIMES.map((t) => {
                        const selected = newTimes.includes(t);

                        return (
                            <button
                                key={t}
                                onClick={() => setNewTimes(prev => ([...prev, t])) }
                                className={`px-3 py-1.5 rounded border font-mono text-xs transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${
                                selected ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card hover:border-primary/40"
                                }`}
                            >
                                {t}
                            </button>
                        );
                    })}
                    </div>
                </div>

                {/* MODAL BUTTONS */}
                <div className="flex gap-2">
                    <button
                        onClick={() => { setAdding(false); setNewDate(""); setNewTimes([]); }}
                        className="flex-1 py-2 border border-border rounded text-sm hover:bg-muted transition-colors cursor-pointer"
                    >
                    Cancelar
                    </button>
                    <button
                        disabled={!newDate || newTimes.length === 0}
                        onClick={() => addSlot()}
                        className={`flex-1 py-2 bg-primary text-primary-foreground rounded text-sm font-medium 
                        hover:opacity-90 transition-opacity disabled:opacity-40 cursor-pointer`}
                    >
                    Salvar horários
                    </button>
                </div>
            </div>
            }
            
            <div className="flex flex-col gap-5">
                {/* EXIBIÇÃO DOS HORÁRIOS ORGANIZADOS */}
                { monitor.slots.length == 0 
                    ? <p className="text-xs text-muted-foreground">Nenhum horário cadastrado...</p>
                    : slotsData.map((s) => (
                        <div key={s.time} className="border border-border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-mono text-muted-foreground uppercase mb-2">
                                        {s.day}
                                    </p>
                                    <p className="text-sm font-medium text-foreground">
                                        {s.time.split("T")[0]}
                                    </p>

                                    <div className="flex gap-3 mt-3">
                                        {
                                            s.horarios.map((e, index) => (
                                                <div key={index} className={`flex items-center gap-1 px-2.5 py-1 rounded border 
                                                font-mono text-xs  text-muted-foreground
                                                ${e.isBooked 
                                                    ? "bg-secondary/60 border-secondary text-secondary-foreground" 
                                                    : "border-border bg-muted text-muted-foreground"}`}>
                                                    {e.horario}
                                                </div>

                                            ))
                                        }
                                    </div>
                                </div>

                                <button
                                title="Remover dia"
                                disabled={loading}
                                onClick={() => removeSlot(s.id)}
                                className={`p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors 
                                disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer`}>
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    )
                ) }
            </div>
        </div>
    );
}