import { LoginButton } from "@/components/login/buttons/login";
import { auth } from "@/lib/auth";
import { BookOpen } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Login(){
    
    // caso o usuário esteja logado não permitir o re-login
    const session = await auth();
    if(session) redirect("/dashboard");

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-xl mb-4">
                    <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>

                <h1 
                className="text-3xl text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif" }}>
                    AtendeMonitor
                </h1>
                
                <p className="text-muted-foreground text-sm mt-1">Sistema de monitorias acadêmicas</p>
            </div>

            <div className="space-y-4 w-130">
                <p className="text-center text-sm text-muted-foreground mb-6">
                    Como você vai acessar o sistema?
                </p>

                <LoginButton userType={"aluno"} />
                <LoginButton userType={"monitor"} />
            </div>
        </div>
    )
}