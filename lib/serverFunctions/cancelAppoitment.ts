"use server"

import { ServerSideResponse } from "@/types/generals";
import { prisma } from "../prisma";
import { updateTag } from "next/cache";

export default async function serverCancelAppoitment({id} : {id: string}):Promise<ServerSideResponse>{
    const appoitment =  await prisma.appointment.findUnique({where: {id}});
    if(!appoitment) return {status: false, message: "appoitment not found"};
    
    try {
        await prisma.availableSlot.update({
            where: { id: appoitment.slotId},
            data: {
                isBooked: false
            }
        });

        await prisma.appointment.delete({where: {id: appoitment.id}});
        updateTag("appointments");
        
        return {status: true, message: "Appoitment canceled successfully."};

    } catch (error) {
        return {status: false, message: "Internal databse error."};
    }
}