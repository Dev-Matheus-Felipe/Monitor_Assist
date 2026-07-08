import AtendDashboard from "@/components/atendimentos/dashboard";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type Atendimentostype = Prisma.AppointmentGetPayload<{
  include: {
    monitor: {
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    }
  }
}>;

export default async function Atendimentos() {
  const session = await auth();
  if(!session?.user) return null;

  const appointments: Atendimentostype[] = await prisma.appointment.findMany({
    where: {studentId: session.user.id},
    include: {
    monitor: {
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    }
  }
  }) 


  return (
    <div className="w-full h-full">
      <div>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Histórico</p>
        <h1 className="text-3xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Meus atendimentos</h1>
      </div>

      <AtendDashboard appointments={appointments} />
    </div>
  );
}