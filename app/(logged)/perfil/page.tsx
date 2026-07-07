import Horarios from "@/components/perfil/horarios";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MonitorWithSlots } from "@/types/monitor/monitorTypes";
import { Star } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export  default async function MeuPerfilPage() {
  
  // se eu não for monitor não sou permitido ver perfil
  const session = await auth();
  if(!session?.user || session.user.activeProfile != "monitor") redirect("/dashboard");
  
  const monitor: MonitorWithSlots | null = await prisma.monitor.findUnique({
    where : {userId: session.user.id},
    include: {slots: true}
  });
  
  if(!monitor) redirect("/dashboard");

  const user = session.user;

  return (
    <div className="w-full">
      <div>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Informações</p>
        <h1 className="text-3xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Meu Perfil</h1>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mt-6">
        <div className="flex items-start gap-5">
          <Image 
              src={user.image ?? ""} 
              alt="Monitor Image" 
              width={35} 
              height={35}
              className="rounded-full" 
          />
          <div className="flex-1">
            <div className="flex gap-2 items-center">
              <h2 className="font-medium text-xl text-foreground">{user.name}</h2>
              <div className="flex items-center gap-1 ">
                <Star size={12}/>
                <p>{monitor.rating}</p>
              </div>
            </div>
            <p className="text-accent font-medium mt-0.5">{monitor.subject}</p>
            <p className="text-sm font-mono text-muted-foreground mt-0.5">{monitor.department}</p>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-xs font-mono text-muted-foreground">{monitor.totalSessions} atendimentos realizados</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-foreground/70 mt-4 leading-relaxed border-t border-border pt-4">{monitor.bio}</p>
      </div>
      
      <Horarios monitor={monitor} />
    </div>
  );
}