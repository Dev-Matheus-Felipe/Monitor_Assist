import { ViewAppointmentProvider } from "@/components/providers/viewAppointmentProvider";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { NewAppointmentProvider } from "@/components/providers/newAppointmentProvider";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Suspense } from "react";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="min-h-full flex flex-col">
        <SessionProvider>
          <ViewAppointmentProvider>
            <NewAppointmentProvider>
              <Suspense>
                {children}
              </Suspense>
            </NewAppointmentProvider>
          </ViewAppointmentProvider>
        </SessionProvider>

        <Toaster />
      </body>
    </html>
  );
}
