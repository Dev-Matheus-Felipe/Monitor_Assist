"use server"

import { ServerSideResponse } from "@/types/generals"
import { prisma } from "../prisma"
import { updateTag } from "next/cache";
import { auth } from "../auth";

export async function ServerEditAppoitment({id, status} : {id: string, status: "completed" | "upcoming"}):Promise<ServerSideResponse> {
    const session = await auth();
    if(!session?.user) return {status: false, message: "Not authenticated"};
    
    try {
        await prisma.appointment.update({
            where: {id},
            data: {status}
        })

        updateTag(`appointments-${session.user.id}`);
        updateTag(`dashboard-${session.user.id}`);
        return {status: true, message: "Appoitment updated sucessfully."};

    } catch (error) {
        return {status: false, message: "Internal database error."};
    }
}