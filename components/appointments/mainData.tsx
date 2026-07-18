import { prisma } from "@/lib/prisma";
import { AppointmentType } from "@/types/appointments/appointmentsType";
import AtendDashboard from "./dashboard";
import { cacheLife, cacheTag } from "next/cache";

export default async function Maindata({userId} : {userId: string}){
    'use cache'
    cacheLife("hours");
    cacheTag(`appointments-${userId}`);
    
    const appointments: AppointmentType[] = await prisma.appointment.findMany({
        where: {studentId: userId},
        include: {
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
        }
    }); 

    return (
        <>
            {appointments.length > 0 
                ? <AtendDashboard appointments={appointments} />
                : <p className="text-sm mt-2 text-muted-foreground">Você não tem nenhum atendimento agendado.</p>
            }
        </>
    )
}