import { ViewAppointmentProvider } from "@/components/providers/viewAppointmentProvider";
import { NewAppointmentProvider } from "@/components/providers/newAppointmentProvider";
import { Toaster } from "sonner";
import { Suspense } from "react";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
          <ViewAppointmentProvider>
            <NewAppointmentProvider>
              <Suspense fallback={<p>LOADING...</p>}>
                {children}
              </Suspense>
            </NewAppointmentProvider>
          </ViewAppointmentProvider>
        <Toaster />
      </body>
    </html>
  );
}
