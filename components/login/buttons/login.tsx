"use client"

import { ChevronRight, GraduationCap } from "lucide-react";
import { signIn } from "next-auth/react";

export function LoginButton({userType} : {userType: string}){
    const user = {
        title: userType == "aluno" ? "Aluno" : "Monitor",
        description: userType == "aluno" ? "Agende atendimentos com monitores" : "Gerencie seus horários e atendimentos"
    };

    return (
        <button className={`w-full bg-card border border-border rounded-lg p-5 text-left cursor-pointer 
        hover:border-primary/50 hover:shadow-sm transition-all group flex items-center gap-4`}
        onClick={ async() => {
            await signIn("google", {callbackUrl : `/api/login?role=${userType}`}); 
        }}>

            <div className={`w-11 h-11 bg-secondary rounded-lg flex items-center justify-center shrink-0 
            group-hover:bg-primary/10 transition-colors`}>

                <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
                <p className="font-medium text-foreground">Sou {user.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                    {user.description}
                </p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors"/>
        </button>
    );
}