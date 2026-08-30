"use client"

import { BookOpen, LucideIcon } from "lucide-react"
import { useState } from "react";
import MobilenNavbar from "./mobileNavbar";

import SidebarShell from "./sidebarShell";
import { SessionProvider } from "next-auth/react";

// tipagem da navegação da sidebar
export type NavItemsType = {
    id: string,
    label: string,
    icon: LucideIcon
};

export default function Sidebar() {
    const [mobileMenu, setMobileMenu] = useState<boolean>(false);
    
    return (
        <>
            {/* BLUR DO MOBILE */}
            <div className={`w-screen h-screen top-0 aboslute left-0 ${mobileMenu ? "fixed" : "hidden"} bg-transparent z-1`} 
            onClick={()=> setMobileMenu(false)} />

            {/* SIDEBAR DO DESKTOP */}
            <aside
                className={`w-64 bg-sidebar flex flex-col transition-transform duration-500 z-20 h-screen
                lg:translate-x-0 -translate-x-full lg:relative fixed ${mobileMenu && "translate-x-0"}`}>

                {/* HEADER */}
                <div className="px-6 py-6 border-b border-sidebar-border">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-sidebar-primary rounded flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-sidebar" />
                        </div>

                        <div>
                        <p 
                        className="text-sidebar-foreground text-lg leading-none" 
                        style={{ fontFamily: "'Instrument Serif', serif" }}>
                            AtendeMonitor
                        </p>

                        <p className="text-xs font-mono text-sidebar-foreground/50 mt-0.5 leading-none">
                            Sistema de monitorias
                        </p>
                        
                        </div>
                    </div>
                </div>
                
                <SessionProvider>
                    <SidebarShell setMobileMenu={setMobileMenu} />
                </SessionProvider>
                
            </aside>
                        
            {/* NAVBAR DO MOBILE */}
            <MobilenNavbar setMobileMenu={setMobileMenu} />
        </>
    );
}
