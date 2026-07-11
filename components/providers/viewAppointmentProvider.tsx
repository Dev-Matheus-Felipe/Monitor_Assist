"use client";

import ViewAppointment from "../modals/viewAppointment/viewAppointment";
import { AppointmentType } from "@/types/appointments/appointmentsType";
import { createContext, useState } from "react";

type ViewAppointmentContextType = {
  setData: React.Dispatch<React.SetStateAction<AppointmentType | null>>;
};

export const ViewAppointmentContext = createContext<ViewAppointmentContextType | null>(null);

export function ViewAppointmentProvider({children}: {children: React.ReactNode}) {
  const [data, setData] = useState<AppointmentType | null>(null);

  return (
    <ViewAppointmentContext.Provider value={{ setData }}>
      {data && <ViewAppointment data={data} />}
      {children}
    </ViewAppointmentContext.Provider>
  );
}