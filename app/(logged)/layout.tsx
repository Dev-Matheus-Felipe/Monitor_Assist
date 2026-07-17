import Sidebar from "@/components/sidebar/sidebar";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex h-screen w-full flex-wrap max-lg:flex-col">
      <SessionProvider>
        <Sidebar />
      </SessionProvider>

      <div className="flex flex-1 p-[2%] max-sm:p-2 overflow-y-auto h-screen">
        <Suspense fallback={<p>LOADING...</p>}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}
