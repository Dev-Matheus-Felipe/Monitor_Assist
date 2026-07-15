import Sidebar from "@/components/sidebar/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  if(!session?.user) redirect("/login");

  return (
    <div className="flex min-h-screen w-full flex-wrap max-lg:flex-col">
      <Sidebar user={session?.user} />
      <div className="flex flex-1 p-[3%] max-sm:p-2 overflow-y-auto h-screen">
        {children}
      </div>
    </div>
  );
}
