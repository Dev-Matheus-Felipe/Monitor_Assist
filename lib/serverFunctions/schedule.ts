"use server"

import { addNewSlotType } from "@/components/perfil/horarios";
import { auth } from "../auth";
import { prisma } from "../prisma";
import { timeType } from "@/components/modals/newAppointment/newAtendt";

export async function Serverschedule({
    selectedTime,
    topic,
    monitorId
} : {
    selectedTime: timeType
    topic: string
    monitorId: string

}):Promise<addNewSlotType> {
    const session = await auth();

    const monitor = await prisma.monitor.findUnique({
        where: {
            id: monitorId
        }
    })
    if(!session?.user || !monitor) return {status: false, message: "Monitor e/ou usuário não reconhecido"};

    try {
        await prisma.appointment.create({
            data: {
                monitorId: monitorId,
                studentId: session.user.id,
                topic: topic,
                slotId: selectedTime.id
            }
        }) 

        await prisma.availableSlot.update({
            where: { id: selectedTime.id },
            data: {isBooked: true}
        })
        
        return {status: true, message: "deu certto"};

    } catch (error) {
        return {status: false, message: "deu errado"};
    }
}