import MonitorSearch from "@/components/monitors/monitorSearch";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation";

import { MonitorWithAll } from "@/types/monitor/monitorTypes";

export default async function Monitores(){
  const session = await auth();

  if(session?.user.activeProfile == "monitor") redirect("/");

  const monitores: MonitorWithAll[] = await prisma.monitor.findMany({
    include: {slots: {where: {isBooked: false}}, user: true}
  });

  return (
    <div className="h-full w-full flex flex-col gap-10">
      <div className="">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Monitores disponíveis</p>
        <h1 className="text-3xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Encontre um monitor</h1>
      </div>

      <MonitorSearch monitores={monitores} />
    </div>
  )
}