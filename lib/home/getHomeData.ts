import { Calendar, CircleCheckBig, Clock, LucideIcon, User } from "lucide-react";
import { prisma } from "../prisma";
import { HomeDataType } from "@/app/(logged)/dashboard/page";
import { AppointmentType } from "@/types/appointments/appointmentsType";
import { cacheLife, cacheTag } from "next/cache";

export type DataType = {
    label: string,
    value: number,
    icon: "clock" | "calendar" | "user" | "check";
}


// forneçe as informações principais corretamentes baseada no login em monitor e aluno,
export async function getHomeData({userId, isMonitor} : {userId: string, isMonitor: boolean}): Promise<HomeDataType>{
    'use cache'
    cacheLife("hours");
    cacheTag(`dashboard-${userId}`);


    const monitor = await prisma.monitor.findUnique({
        where : { userId: userId }
    });
    
    // data que será mapeado na tela
    let data: DataType[] = [
        {label: isMonitor ? "Pendentes" : "Agendados", value: -1, icon: isMonitor ? "clock" : "calendar"},
        {label: "Realizados", value: -1, icon: "check"},
        {label: isMonitor ? "Disponíveis" : "Monitores", value: -1, icon: isMonitor ? "calendar" : "user"},
    ];

    // requisição para pegar os dados das informações corretamente
    const where = isMonitor 
        ? { monitorId : monitor!.id }
        : { studentId: userId };

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