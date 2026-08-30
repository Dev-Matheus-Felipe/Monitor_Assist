import { LogOut } from "lucide-react";
import Image from "next/image";

export default function SidebarLoading(){
    return (
        <div className="flex-1 flex flex-col justify-bettwen">
            <nav className="flex-1 px-3 py-4 space-y-1 flex flex-col gap-1">
                {
                    [0,1,2].map((value) => (
                        <div
                        key={value}
                        className={`w-full flex items-center gap-3 px-3 py-5.5 rounded text-sm transition-colors 
                        bg-sidebar-accent/40 text-sidebar-accent-foreground font-medium`}
                        />
                        
                    ))
                }
            </nav>

            {/* FOOTER */}
            <div className="px-4 py-4 border-t border-sidebar-border">
                <div className="flex items-center gap-3 mb-3">
                    <Image
                        width={32}
                        height={32}
                        className={`rounded-full`}
                        src={"/userIcon.png"} 
                        alt={"user icon"} 
                    />
                </div>

                <div
                    className={`w-full cursor-pointer flex items-center gap-2 px-3 py-3 rounded text-sm 
                    text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/40 
                    transition-colors`}
                >
                    <LogOut className="w-4 h-4"/>
                    Sair
                </div>
            </div>
        </div>
    )
}