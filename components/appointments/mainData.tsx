import { prisma } from "@/lib/prisma";
import { AppointmentType } from "@/types/appointments/appointmentsType";
import AtendDashboard from "./dashboard";
import { cacheLife, cacheTag } from "next/cache";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

const getAppointments = async({userId} : {userId: string}) => {
    'use cache'
    cacheLife("minutes");
    cacheTag(`appointments-${userId}`);

    return await prisma.appointment.findMany({
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
}

export default async function Maindata({sessionPromise} : {sessionPromise: Promise<Session | null>}){
    const session = await sessionPromise;
    if(!session?.user.id) redirect("/");
    
    const appointments: AppointmentType[] = await getAppointments({userId: session.user.id});

    return (
        <>
            {appointments.length > 0 
                ? <AtendDashboard appointments={appointments} />
                : <p className="text-sm mt-2 text-muted-foreground">Você não tem nenhum atendimento agendado.</p>
            }
        </>
    )
}