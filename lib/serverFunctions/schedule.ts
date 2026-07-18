"use server"

import { ServerSideResponse } from "@/types/generals";
import { auth } from "../auth";
import { prisma } from "../prisma";
import { timeType } from "@/components/modals/newAppointment/newAtendt";
import { updateTag } from "next/cache";

export async function Serverschedule({
    selectedTime,
    topic,
    monitorId,
    selectedDate
} : {
    selectedTime: timeType
    topic: string
    monitorId: string,
    selectedDate: string

}):Promise<ServerSideResponse> {
    const session = await auth();

    // procura o monitor e o valida 
    const monitor = await prisma.monitor.findUnique({
        where: { id: monitorId }
    })

    if(!session?.user || !monitor) return {status: false, message: "Unrecognized monitor and/or user!"};

    try {
        const creationDate = new Date(`${selectedDate}T${selectedTime.time}`);

        await prisma.appointment.create({
            data: {
                monitorId: monitorId,
                studentId: session.user.id,
                topic: topic,
                slotId: selectedTime.id,
                date: creationDate
            }
        }) 

        await prisma.availableSlot.update({
            where: { id: selectedTime.id },
            data: {isBooked: true}
        })

        updateTag(`appointments-${session.user.id}`);
        updateTag(`dashboard-${session.user.id}`);
        
        return {status: true, message: "Appointment successfully scheduled."};

    } catch (error) {
        return {status: false, message: "Interal databse error."};
    }
}