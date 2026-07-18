import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DataType } from "@/lib/home/getHomeData";
import { AppointmentType } from "@/types/appointments/appointmentsType";
import QuickAcess from "@/components/dashboard/quickAcess";
import { Suspense } from "react";
import DashboardLoading from "@/components/loadings/dashboardLoading";
import MainData from "@/components/dashboard/mainData";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Atende Monitor",
  description:
    "View your tutoring overview, upcoming appointments, and quick access to the main features of Atende Monitor.",
};

// tipagem das boxes principais
export type HomeDataType = {
    data: DataType[],
    appointment: AppointmentType
}

export default async  function Dashboard(){
    // não permitido visitar sem estar logado
    const session = await auth();
    if(!session?.user) redirect("/login");    

    

    return (
        <div className="w-full h-full flex flex-col gap-8">
            <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Bem-vindo,</p>
                <h1 className="text-2xl text-foreground leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {session.user.name.split(" ")[0]}
                </h1>       
            </div>

            <Suspense fallback={<DashboardLoading />}>
                <MainData userId={session.user.id} activeProfile={session.user.activeProfile} />
            </Suspense>

            <QuickAcess isMonitor={session.user.activeProfile == "monitor"} />
        </div>
    );
}