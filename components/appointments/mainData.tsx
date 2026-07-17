import { prisma } from "@/lib/prisma";
import { AppointmentType } from "@/types/appointments/appointmentsType";
import { Session } from "next-auth";
import AtendDashboard from "./dashboard";

export default async function Maindata({session} : {session: Session}){
    const appointments: AppointmentType[] = await prisma.appointment.findMany({
        where: {studentId: session.user.id},
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