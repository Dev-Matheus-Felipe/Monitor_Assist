import Sidebar from "@/components/sidebar/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex h-screen w-full flex-wrap max-lg:flex-col">
      <Sidebar />

      <div className="flex flex-1 p-[2%] max-sm:p-2 overflow-y-auto h-screen">
          {children}
      </div>
    </div>
  );
}
