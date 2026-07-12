import { Calendar, ClipboardList, User } from "lucide-react";
import Link from "next/link";

export default function QuickAcess({isMonitor} : {isMonitor: boolean}){
    const acess = [
        { label: isMonitor ? "Perfil" : "Novo agendamento", desc: "Escolha um monitor e horário", icon: isMonitor ? User : Calendar, target: isMonitor ? "/profile" : "/tutors" },
        { label: "Meus atendimentos", desc: "Consulte o histórico", icon: ClipboardList, target: "/appointments" },
    ];

    return (
        <div>
            <h2 className="text-xl text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Acesso rápido</h2>
            <div className="grid grid-cols-2 gap-3">
                {acess.map(({ label, desc, icon: Icon, target }) => (
                <Link 
                href={target}
                key={label}  
                className="bg-card border border-border rounded-lg p-4 text-left hover:border-primary/40 hover:shadow-sm transition-all">
                    <Icon className="w-5 h-5 text-accent mb-2" />
                    <p className="font-medium text-sm text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </Link>
                ))}
            </div>
        </div>
    );
}