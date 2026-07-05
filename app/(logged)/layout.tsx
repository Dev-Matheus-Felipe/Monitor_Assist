import Sidebar from "@/components/sidebar/sidebar";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  if(!session?.user) redirect("/login");

  return (
    <div className="flex min-h-screen w-full flex-wrap">
        <Sidebar user={session?.user} />
        <SessionProvider>
          {children}
        </SessionProvider>
    </div>
  );
}
