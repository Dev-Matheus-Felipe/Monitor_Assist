"use server"

import { ServerSideResponse } from "@/types/generals"
import { prisma } from "../prisma"
import { updateTag } from "next/cache";

export async function ServerEditAppoitment({id, status} : {id: string, status: "completed" | "upcoming"}):Promise<ServerSideResponse> {
    try {
        await prisma.appointment.update({
            where: {id},
            data: {status}
        })

        updateTag("appointments");
        return {status: true, message: "Appoitment updated sucessfully."};

    } catch (error) {
        return {status: false, message: "Internal database error."};
    }
}