import { ViewAppointmentProvider } from "@/components/providers/viewAppointmentProvider";
import { NewAppointmentProvider } from "@/components/providers/newAppointmentProvider";
import { Toaster } from "sonner";
import "./globals.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: "Atende Monitor",
    template: "%s | Atende Monitor",
  },
  description:
    "Atende Monitor is a web application that simplifies the scheduling and management of academic tutoring sessions for students and monitors.",
  keywords: [
    "Next.js",
    "Tutoring",
    "Education",
    "Scheduling",
    "Academic Monitor",
    "Students",
    "Appointments",
  ],
  authors: [{ name: "Matheus Felipe" }],
  creator: "Matheus Felipe",
  applicationName: "Atende Monitor",
  openGraph: {
    title: "Atende Monitor",
    description:
      "Simplify the scheduling and management of academic tutoring sessions.",
    type: "website",
    locale: "en_US",
  },
};

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
                {children}
            </NewAppointmentProvider>
          </ViewAppointmentProvider>
          
        <Toaster />
        <NextTopLoader
          color="#711ab8"
          height={3}
          showSpinner={false}
        />
      </body>
    </html>
  );
}
