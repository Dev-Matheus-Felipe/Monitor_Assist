import { diasSemana } from "./generals"

export type horarioType  = {
    id: string,
    horario: string,
    isBooked: boolean
}

// horário type organizado
export type slotsDataType = {
    id: string[],
    day: string,
    time: string,
    horarios: horarioType[]
}

export type Slots = {
    id: string;
    createdAt: Date;
    monitorId: string;
    date: Date;
    isBooked: boolean;
}


export function getSlotsData({slots} : {slots: Slots[]}){
    let response: slotsDataType[] = [];
    
    // para cada horário disponível separar por dias onde cada dia mantém todos os horários disponíveis
    for(const slot of slots){

        // pega a data, dia da semana e horas do horário
        const data = slot.date.toISOString().split("T")[0];
        const day = diasSemana[slot.date.getDay()];
        const hour = slot.date.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        })

        // procura se exstir algum horário nesse mesmo dia existente
        const index = response.findIndex(e => e.time == data);


        // se não existir cria uam nova caso contrário apenas salva no existente
        if(index != -1){
            response[index].horarios.push({horario: hour, isBooked: slot.isBooked, id: slot.id});
            response[index].id.push(slot.id);

        } else 
            response.push({id:[slot.id], day: day, time: data, horarios: [{horario: hour, isBooked: slot.isBooked, id: slot.id}]});
        
    }

    return response;
}