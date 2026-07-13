import Boxes from "@/components/dashboard/boxes";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DataType, getHomeData } from "@/lib/home/getHomeData";
import { AppointmentType } from "@/types/appointments/appointmentsType";
import NextAptHome from "@/components/dashboard/nextApt";
import QuickAcess from "@/components/dashboard/quickAcess";

// tipagem das boxes principais
export type HomeDataType = {
    data: DataType[],
    appointment: AppointmentType
}

export default async  function Home(){
    // não permitido visitar sem estar logado
    const session = await auth();
    if(!session?.user) redirect("/login");
    
    // data que será mapeado para visualização
    const homeData: HomeDataType = await getHomeData({
        user: session.user, 
        isMonitor: session.user.activeProfile == "monitor",
    });

    return (
        <div className="w-full h-full flex flex-col gap-8">
            <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Bem-vindo,</p>
                <h1 className="text-2xl text-foreground leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {session.user.name.split(" ")[0]}
                </h1>   
            </div>

              <Boxes data={homeData.data} />
              <NextAptHome homeData={homeData} activeProfile={session.user.activeProfile} />

              <QuickAcess isMonitor={session.user.activeProfile == "monitor"} />
        </div>
    );
}

