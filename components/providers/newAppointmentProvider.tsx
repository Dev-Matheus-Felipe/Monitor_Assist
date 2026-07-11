"use client"

import { MonitorWithAll } from "@/types/monitor/monitorTypes";
import { createContext, Dispatch, useState } from "react"
import NewAtendtModal from "../modals/newAppointment/newAtendt";

type NewAppointmentContextType = {
    setData: Dispatch<React.SetStateAction<MonitorWithAll | null>>
};

export const NewAppointmentContext = createContext<NewAppointmentContextType | null>(null);

export function NewAppointmentProvider({children} : {children: React.ReactNode}){
    const [data, setData] = useState<MonitorWithAll | null>(null);

    return (
        <NewAppointmentContext.Provider value={{ setData }}>
            {data && <NewAtendtModal monitor={data} />}
            {children}
        </NewAppointmentContext.Provider>
    )
}