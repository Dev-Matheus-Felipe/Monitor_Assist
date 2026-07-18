import { auth } from "@/lib/auth";
import Maindata from "@/components/appointments/mainData";
import { Suspense } from "react";
import AppointmentLoading from "@/components/loadings/appointmentLoading";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appointments | Atende Monitor",
  description:
    "Manage tutoring appointments by viewing, scheduling, updating, or canceling sessions.",
};

export default async function Atendimentos() {

  const session = await auth();
  if(!session?.user) return null;

  return (
    <div className="w-full h-full flex flex-col">
      <div>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Histórico</p>
        <h1 className="text-3xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Meus atendimentos</h1>
      </div>

      <Suspense fallback={<AppointmentLoading />}>
        <Maindata userId={session.user.id} />
      </Suspense>
    </div>
  );
}