import Maindata from "@/components/appointments/mainData";
import type { Metadata } from "next";
import getSessionFunc from "@/lib/serverFunctions/getSession";
import { Suspense } from "react";
import AppointmentsLoading from "@/components/loadings/appointmentsLoading";

export const metadata: Metadata = {
  title: "Appointments | Atende Monitor",
  description:
    "Manage tutoring appointments by viewing, scheduling, updating, or canceling sessions.",
};

export default async function Atendimentos() {
  const session = getSessionFunc();

  return (
    <div className="w-full h-full flex flex-col">
      <div>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Histórico</p>
        <h1 className="text-3xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Meus atendimentos</h1>
      </div>

      <Suspense fallback={ <AppointmentsLoading /> } >
        <Maindata sessionPromise={session} />
      </Suspense>
    </div>
  );
}