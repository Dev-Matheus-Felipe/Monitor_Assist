import { MonitorWithAll } from "@/types/monitor/monitorTypes";
import { Star } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function Monitor({
    monitor,
    setData
} : {
    monitor: MonitorWithAll,
    setData: Dispatch<SetStateAction<MonitorWithAll | null>>
}){
    return (
        <div 
            className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow"
            key={monitor.id}>
                
            <div className="flex items-start gap-4">
                <Image
                    width={30} 
                    height={30} 
                    src={monitor.user.image ?? ""} 
                    alt={"monitor image"} 
                    className="rounded-full" 
                />

                <div className="flex-1 min-w-0">
                    <div className="flex gap-2">
                        <h3 className="font-medium text-foreground leading-tight">{monitor.user.name}</h3>
                        <div className="flex items-center gap-1 ">
                                <Star size={12}/>
                                <p>{monitor.rating}</p>
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground font-mono mt-0.5">{monitor.department}</p>

                    <span className=" text-xs font-mono text-muted-foreground  flex items-end">
                        {monitor.totalSessions} atendimentos
                    </span>
                </div>
            </div>

            <p className="text-sm text-foreground/70 mt-3 leading-relaxed line-clamp-2">{monitor.bio}</p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="text-xs font-mono text-muted-foreground">
                    {monitor.slots.length} horários disponíveis
                </span>

                <button className={`px-4 py-1.5 bg-primary text-primary-foreground rounded text-sm cursor-pointer
                font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5`}
                onClick={() => setData(monitor) }>
                    Agendar
                </button>
            </div>
        </div>
    );
}