import { Calendar, CircleCheckBig, Clock, LucideIcon, User } from "lucide-react";
import Boxes from "@/components/dashboard/boxes";
import { redirect } from "next/navigation";
import { Monitor } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";
import { auth } from "@/lib/auth";

// tipagem das boxes principais
export type DataType = {
    label: string,
    value: number,
    icon: LucideIcon
}

// forneçe as informações principais corretamentes baseada no login em monitor e aluno,
async function getData({user, isMonitor, monitor} : {user: Session["user"], isMonitor: boolean, monitor: Monitor | null}){
    // data que será mapeado na tela
    let data: DataType[] = [
        {label: isMonitor ? "Pendentes" : "Agendados", value: -1, icon: isMonitor ? Clock : Calendar},
        {label: "Realizados", value: -1, icon: CircleCheckBig},
        {label: isMonitor ? "Disponíveis" : "Monitores", value: -1, icon: isMonitor ? Calendar : User},
    ];

    // requisição para pegar os dados das informações corretamente
    const where = isMonitor 
        ? { monitorId : monitor!.id }
        : { studentId: user.id };

    const appointments = await prisma.appointment.findMany({ where, });

    // apenas salva a quantidade do que achar
    data[0].value = appointments.filter((appointment) => appointment.status == "upcoming").length;
    data[1].value = appointments.filter((appointment) => appointment.status == "completed").length;

    if(isMonitor){
        const horarios = await prisma.availableSlot.findMany({
            where: {monitorId: monitor!.id}
        })

        data[2].value = horarios.length;
    
    } else {
        const monitores = await prisma.monitor.findMany();
        data[2].value = monitores.length;
    }

    return data;
}

export default async  function Home(){
    // não permitido visitar sem estar logado
    const session = await auth();
    if(!session?.user) redirect("/login");

    const monitor = await prisma.monitor.findUnique({
        where : {
            userId: session.user.id
        }
    });
    
    // data que será mapeado para visualização
    const data: DataType[] = await getData({
        user: session.user, 
        isMonitor: session.user.activeProfile == "monitor",
        monitor: monitor
    });

    return (
        <div className="w-full h-full flex flex-col gap-8">
            <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Bem-vindo,</p>
                <h1 className="text-2xl text-foreground leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {session.user.name.split(" ")[0]}
                </h1>   
            </div>

              <Boxes data={data} />
        </div>
    );
}

