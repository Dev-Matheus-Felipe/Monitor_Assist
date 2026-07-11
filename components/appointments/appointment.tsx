import { ViewAppointmentContext } from "../providers/viewAppointmentProvider";
import { AppointmentType } from "@/types/appointments/appointmentsType";
import { ChevronRight } from "lucide-react";
import { useContext } from "react";

export default function SingleAppointment({apt} : {apt: AppointmentType}){
    const context = useContext(ViewAppointmentContext);
    if(!context) return null;

    return (
        <button 
        onClick={() => context.setData(apt) }
        className={`w-full bg-card border rounded-lg p-5 text-left hover:shadow-md hover:border-primary/30 cursor-pointer
        transition-all group ${apt.status === "cancelled" ? "border-border opacity-60" : "border-border"}`}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium text-foreground">{apt.monitor.user.name}</p>
                            <span className={`px-2 py-0.5 rounded text-xs font-mono font-medium
                            ${apt.status == "completed"
                                ? "bg-secondary text-secondary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}>
                                {apt.status}
                            </span>
                        </div>

                        <p className="text-sm text-accent font-medium mt-0.5">{apt.monitor.subject}</p>
                        <p className="text-xs font-mono text-muted-foreground mt-1">date here</p>
                        <p className="text-sm text-foreground/70 mt-2 line-clamp-1">{apt.topic}</p>
                    </div>
                </div>
                
                {/* CLOSE BUTTON */}
                <ChevronRight 
                    onClick={() => context.setData(apt) }
                    className={`w-4 h-4 text-muted-foreground shrink-0 mt-1 group-hover:text-primary 
                    transition-colors cursor-pointer`} />
            </div>
        </button>
    )
}