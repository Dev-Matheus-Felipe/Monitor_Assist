"use client"

import { BookOpen } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function MobilenNavbar({
    setMobileMenu
} : {
    setMobileMenu: Dispatch<SetStateAction<boolean>>
}){
    return (
        <header className={`lg:hidden sticky top-0 z-10 px-4 py-3 flex items-center mb-3
        justify-between border-b border-sidebar-border bg-sidebar`}>
            <button onClick={() => setMobileMenu(true)} className="p-2 text-sidebar-foreground">
                <BookOpen className="w-5 h-5" />
            </button>

            <p className="text-sidebar-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                AtendeMonitor
            </p>
            
            <div className="w-9" />
        </header>
    );
}