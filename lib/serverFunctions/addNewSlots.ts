"use server"

import { addNewSlotType } from "@/components/perfil/horarios";
import { auth } from "../auth"
import { prisma } from "../prisma";

// server function responsável pelo cadastramento de novos horários
export async function addNewSlots({newDate, newTimes} : {newDate: string, newTimes: string[]}): Promise<addNewSlotType>{
    
    // pega o monitor e o usuário logado em questão e verifica compatibilidade
    const session = await auth();
    if(!session?.user) return {status: false, message: "Not logged!"};

    const monitor = await prisma.monitor.findUnique({
        where: {userId: session.user.id}
    })

    if(!monitor) return {status: false, message: "Not logged!"};
    
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

        return {status: true, message: "Horário criado com sucesso!"};
    } catch (error) {

        return {status: false, message: "Algo deu errado, por favor tente novamente mais tarde!"}
    }
}