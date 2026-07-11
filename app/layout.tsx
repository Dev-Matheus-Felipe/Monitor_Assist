import { ViewAppointmentProvider } from "@/components/providers/viewAppointmentProvider";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { NewAppointmentProvider } from "@/components/providers/newAppointmentProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <SessionProvider>
          <ViewAppointmentProvider>
            <NewAppointmentProvider>
              {children}
            </NewAppointmentProvider>
          </ViewAppointmentProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
