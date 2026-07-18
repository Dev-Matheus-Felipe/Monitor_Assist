"use server"

import { updateTag } from "next/cache";
import { prisma } from "../prisma"
import { auth } from "../auth";

export async function serverRemoveSlot({id, monitorId} : {id: string[], monitorId: string}){
    const session = await auth();
    if(!session?.user) return;

    await prisma.availableSlot.deleteMany({
        where: {
            id: { in: id },
            monitorId: monitorId
        }
    });

    updateTag(`appointments-${session.user.id}`);
    updateTag(`dashboard-${session.user.id}`);
}