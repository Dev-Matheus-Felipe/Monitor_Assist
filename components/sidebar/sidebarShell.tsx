import { ClipboardList, LayoutDashboard, LogOut, Users } from "lucide-react"
import { signOut, useSession } from "next-auth/react";
import Navegation from "./navegation";
import { Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import SidebarLoading from "../loadings/sidebarLoading";

// define os items da navegação da sidebar
function getNavItems({role} : {role: "monitor" | "aluno"}){
    let isMonitor = role == "monitor";

    return [
        { id: "/dashboard", label: isMonitor ? "Painel" : "Início", icon: LayoutDashboard },
        { id: isMonitor ? "/appointments" : "/tutors", label: isMonitor ? "Atendimentos" : "Monitores", icon: isMonitor ? ClipboardList : Users },
        { id: isMonitor ? "/profile"  : "/appointments", label: isMonitor ? "Meu perfil" : "Meus Atendimentos", icon: isMonitor ? Users :  ClipboardList},
    ]
}

export default function SidebarShell({
    setMobileMenu
} : {
    setMobileMenu: Dispatch<SetStateAction<boolean>>
}){

    const {data: session, status } = useSession();

    const pathname = usePathname().split("/")[1];
    const activeView = `/${pathname}`;
    
    if(status == "loading"){
        return <SidebarLoading />
    }

    if (!session?.user)  return null;


    // aqui TypeScript sabe que existe sessão
    const user = session.user;
    const navItems = getNavItems({
        role: user.activeProfile
    });

    return (
        <>
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
                    text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/40 
                    transition-colors`}
                >
                    <LogOut className="w-4 h-4"/>
                    Sair
                </button>
            </div>
        </>
    )
}