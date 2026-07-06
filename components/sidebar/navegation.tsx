import { Dispatch, SetStateAction } from "react";
import { NavItemsType } from "./sidebar";
import Link from "next/link";

export default function Navegation({
    navItems, 
    activeView,
    setMobileMenu
} : {
    navItems: NavItemsType[], 
    activeView: string,
    setMobileMenu: Dispatch<SetStateAction<boolean>>
}){

    return (
        <nav className="flex-1 px-3 py-4 space-y-1 flex flex-col gap-0.5">
            {
                navItems.map(({ id, label, icon: Icon }) => (
                    <Link
                    onClick={()=> setMobileMenu(false)}
                    href={id}
                    key={id}
                    className={`w-full flex items-center gap-3 px-3 py-3.5 rounded text-sm transition-colors 
                    cursor-pointer ${
                        activeView === id
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/40"
                    }`}
                    >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1 text-left">{label}</span>
                    
                    </Link>
                ))
            }
        </nav>
    )
}