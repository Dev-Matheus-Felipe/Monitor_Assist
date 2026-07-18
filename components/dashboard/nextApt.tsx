import { HomeDataType } from "@/app/(logged)/dashboard/page";
import { AppointmentType } from "@/types/appointments/appointmentsType";
import { CalendarDays } from "lucide-react";

export default function NextAptHome({
    appointment,
    activeProfile
} : {
    appointment: AppointmentType,
    activeProfile: string
}){
    
    return (
        <div className="bg-primary text-primary-foreground rounded-lg p-5">
            <p className="text-xs font-mono uppercase tracking-widest opacity-70 mb-3">Próximo atendimento</p>
            {appointment 
                ? <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
                        <CalendarDays className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                        <p className="font-medium text-lg leading-tight">{appointment.monitor.user.name}</p>
                        <p className="opacity-70 text-sm mt-0.5">
                            {activeProfile == "aluno" 
                                ? appointment.monitor.department ?? "Undefined"
                                : "aluno"
                            }
                        </p>
                        
                        <p className="font-mono text-sm my-3.5 opacity-90">
                            {appointment.date.toLocaleDateString()}
                        </p>

                        <p className="text-sm opacity-80 line-clamp-1">{appointment.topic}</p> 
                    </div>
                </div>

                : <p className="text-sm">Nenhum atendimento marcado até o momento...</p>
            }
        </div>
    );
}