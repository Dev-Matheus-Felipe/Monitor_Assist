"use server"

import { updateTag } from "next/cache";
import { prisma } from "../prisma"

export async function serverRemoveSlot({id, monitorId} : {id: string[], monitorId: string}){

    await prisma.availableSlot.deleteMany({
        where: {
            id: { in: id },
            monitorId: monitorId
        }
    });

    updateTag("appointments");
    updateTag("dashboard");
}