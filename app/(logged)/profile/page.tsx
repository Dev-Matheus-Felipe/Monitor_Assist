import EditFuncsPage from "@/components/perfil/editFuncs";
import Horarios from "@/components/perfil/horarios";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MonitorWithSlots } from "@/types/monitor/monitorTypes";
import { redirect } from "next/navigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Atende Monitor",
  description:
    "Manage your personal information and monitor profile settings.",
};

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
    <div className="w-full h-full">
      <div>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Informações</p>
        <h1 className="text-3xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Meu Perfil</h1>
      </div>

      <EditFuncsPage monitor={monitor} user={user} />
      <Horarios monitor={monitor} />

    </div>
  );
}