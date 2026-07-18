import { HomeDataType } from "@/app/(logged)/dashboard/page";
import Boxes from "../dashboard/boxes";
import NextAptHome from "../dashboard/nextApt";
import { getHomeData } from "@/lib/home/getHomeData";

export default async function MainData({
    userId,
    activeProfile
} : {
    userId: string,
    activeProfile: "aluno" | "monitor"
}){
    // data que será mapeado para visualização
    const homeData: HomeDataType = await getHomeData({
        userId: userId, 
        isMonitor: activeProfile == "monitor",
    });

    return (
        <>
            <Boxes data={homeData.data} />
            <NextAptHome appointment={homeData.appointment} activeProfile={activeProfile} />
        </>
    )
}