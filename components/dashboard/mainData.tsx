import { HomeDataType } from "@/app/(logged)/dashboard/page";
import Boxes from "../dashboard/boxes";
import NextAptHome from "../dashboard/nextApt";
import { getHomeData } from "@/lib/home/getHomeData";
import { Session } from "next-auth";

export default async function MainData({session} : {session: Session}){

    // data que será mapeado para visualização

    const homeData: HomeDataType = await getHomeData({
        user: session.user, 
        isMonitor: session.user.activeProfile == "monitor",
    });

    return (
        <>
            <Boxes data={homeData.data} />
            <NextAptHome homeData={homeData} activeProfile={session.user.activeProfile} />
        </>
    )
}