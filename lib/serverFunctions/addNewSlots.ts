"use server"

import { ServerSideResponse } from "@/types/generals";
import { auth } from "../auth"
import { prisma } from "../prisma";
import { updateTag } from "next/cache";

// server function responsável pelo cadastramento de novos horários
export async function addNewSlots({newDate, newTimes} : {newDate: string, newTimes: string[]}): Promise<ServerSideResponse>{
    
    // pega o monitor e o usuário logado em questão e verifica compatibilidade
    const session = await auth();
    if(!session?.user) return {status: false, message: "Not allowed!"};

    const monitor = await prisma.monitor.findUnique({
        where: {userId: session.user.id}
    })

    if(!monitor) return {status: false, message: "Not allowed!"};
    
    // salva um objeto representando os horários que serão salvos
    const slots = newTimes.map(e => (
        {
            monitorId: monitor.id,
            date: new Date(`${newDate}T${e}`)
        }
    ))

    // tenta salvar no banco de dados tratando se algo der errado
    try {
        await prisma.availableSlot.createMany({
            data: slots
        });

        updateTag("appointments");
        updateTag("dashboard");
        
        return {status: true, message: "schedules created successfully."};
    } catch (error) {

        return {status: false, message: "Internal databse error."}
    }
}