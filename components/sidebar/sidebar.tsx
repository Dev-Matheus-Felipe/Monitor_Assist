"use client"

import { BookOpen, ClipboardList, LayoutDashboard, LogOut, LucideIcon, Users } from "lucide-react"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MobilenNavbar from "./mobileNavbar";
import { signOut, useSession } from "next-auth/react";
import Navegation from "./navegation";
import { User } from "next-auth";
import Image from "next/image";

// tipagem da navegação da sidebar
export type NavItemsType = {
    id: string,
    label: string,
    icon: LucideIcon
};

// define os items da navegação da sidebar
function getNavItems({role} : {role: "monitor" | "aluno"}){
    let isMonitor = role == "monitor";

    return [
        { id: "/dashboard", label: isMonitor ? "Painel" : "Início", icon: LayoutDashboard },
        { id: isMonitor ? "/appointments" : "/tutors", label: isMonitor ? "Atendimentos" : "Monitores", icon: isMonitor ? ClipboardList : Users },
        { id: isMonitor ? "/profile"  : "/appointments", label: isMonitor ? "Meu perfil" : "Meus Atendimentos", icon: isMonitor ? Users :  ClipboardList},
    ]
}

export default function Sidebar() {
    const {data: session} = useSession();
    
    const [activeView, setActiveView] = useState<string>("/dashboard");
    const [mobileMenu, setMobileMenu] = useState<boolean>(false);
    
    // track o path para colorir os items na navegação corretamente
    const pathname = usePathname().split("/")[1];
    const user = session?.user;
    
    useEffect(() => {
        setActiveView("/" + pathname);
    }, [pathname]);
    
    // items de navegação para a redenrização
    if(!user) return null;

    const navItems: NavItemsType[] = getNavItems({role: user.activeProfile});
    
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

                {/* NAVEGAÇÃO */}
                <Navegation navItems={navItems} activeView={activeView} setMobileMenu={setMobileMenu} />

                {/* FOOTER */}
                <div className="px-4 py-4 border-t border-sidebar-border">
                    <div className="flex items-center gap-3 mb-3">
                        <Image 
                            width={32}
                            height={32}
                            className={`rounded-full bg-sidebar-accent flex items-center justify-center 
                            shrink-0 text-xs font-medium text-sidebar-foreground`}
                            src={user.image ?? ""} 
                            alt={"user icon"} 
                        />

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-sidebar-foreground leading-none truncate">{user.name}</p>
                            <p className="text-xs font-mono text-sidebar-foreground/50 mt-0.5 truncate">{user.activeProfile}</p>
                        </div>
                    </div>
                    <button
                        onClick={ ()=> signOut()}
                        className={`w-full cursor-pointer flex items-center gap-2 px-3 py-3 rounded text-sm 
                        text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/40 transition-colors`}
                    >
                        <LogOut className="w-4 h-4"/>
                        Sair
                    </button>
                </div>
            </aside>
                        
            {/* NAVBAR DO MOBILE */}
            <MobilenNavbar setMobileMenu={setMobileMenu} />
        </>
    );
}
