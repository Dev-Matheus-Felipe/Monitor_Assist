import { AppointmentType } from "@/types/appointments/appointmentsType";
import AtendDashboard from "@/components/appointments/dashboard";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function Atendimentos() {
  const session = await auth();
  if(!session?.user) return null;

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
    <div className="w-full h-full">
      <div>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Histórico</p>
        <h1 className="text-3xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Meus atendimentos</h1>
      </div>

      {appointments.length > 0 
        ? <AtendDashboard appointments={appointments} />
        : <p className="text-sm mt-2 text-muted-foreground">Você não tem nenhum atendimento agendado.</p>
      }
    </div>
  );
}