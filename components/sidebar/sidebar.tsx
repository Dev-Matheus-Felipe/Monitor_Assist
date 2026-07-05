"use client"

import { BookOpen, ClipboardList, LayoutDashboard, LogOut, LucideIcon, Users } from "lucide-react"
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navegation from "./navegation";
import { usePathname } from "next/navigation";

export type NavItemsType = {
    id: string,
    label: string,
    icon: LucideIcon
};

const alunoNavItems: NavItemsType[] = [
    { id: "dashboard", label: "Início", icon: LayoutDashboard },
    { id: "Monitores", label: "Monitores", icon: Users },
    { id: "atendimentos", label: "Meus Atendimentos", icon: ClipboardList },
];

const monitorNavItems: NavItemsType[] = [
    { id: "dashboard", label: "Painel", icon: LayoutDashboard },
    { id: "atendimentos", label: "Atendimentos", icon: ClipboardList },
    { id: "perfil", label: "Meu perfil", icon: Users },
];

export default function Sidebar({user} : {user: User}) {
    const [activeView, setActiveView] = useState<string>("dashboard");
    const pathname = usePathname().split("/")[1];

    useEffect(() => {
        setActiveView(pathname);
    }, [pathname]);

    const navItems: NavItemsType[] = user.role == "aluno" ? alunoNavItems : monitorNavItems;
    
    return (
        <>
        <aside
            className={`w-64 max-lg:hidden bg-sidebar lg:flex flex-col transition-transform duration-200 lg:translate-x-0`}>
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

            <Navegation navItems={navItems} activeView={activeView} />

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
                        <p className="text-xs font-mono text-sidebar-foreground/50 mt-0.5 truncate">{user.role}</p>
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
        </>
    );
}
