import { Calendar, CircleCheckBig, Clock, LucideIcon, User } from "lucide-react";
import { prisma } from "../prisma";
import { Session } from "next-auth";
import { HomeDataType } from "@/app/(logged)/dashboard/page";
import { AppointmentType } from "@/types/appointments/appointmentsType";

export type DataType = {
    label: string,
    value: number,
    icon: LucideIcon
}


// forneçe as informações principais corretamentes baseada no login em monitor e aluno,
export async function getHomeData({user, isMonitor} : {user: Session["user"], isMonitor: boolean}): Promise<HomeDataType>{
    const monitor = await prisma.monitor.findUnique({
        where : {
            userId: user.id
        }
    });
    
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

    const appointments: AppointmentType[] = await prisma.appointment.findMany({ where, include: {
        student: {
            select: {
                name: true,
            }
        },

        monitor: {
            include: {
                user: true
            }
        }
    }});

    appointments.sort((a, b) => b.date.getTime() - a.date.getTime());
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

    return {data, appointment: appointments[0]};
}