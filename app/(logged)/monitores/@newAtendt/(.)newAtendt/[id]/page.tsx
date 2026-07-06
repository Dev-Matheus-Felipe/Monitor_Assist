import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import { Prisma } from "@prisma/client";
import NewAtendtModal from "@/components/modals/newAtendt";

export type MonitorModal = Prisma.MonitorGetPayload<{
  include: {
    appointments: true;
    user: true
  };
}>;

export default async function NewAtendiment({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params;

  const monitor: MonitorModal | null = await prisma.monitor.findUnique({
    where: {
      userId: id
    },
    
    include: {
      appointments: true,
      user: true
    }
  });

  if(!monitor) redirect("/dashboard");

  return (
    <div className="absolute w-full h-full top-0 left-0 z-100 bg-black/50 backdrop-blur- inset-0">
        <NewAtendtModal monitor={monitor} />
    </div>
    )
}