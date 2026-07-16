import { LoginButton } from "@/components/login/buttons/login";
import { BookOpen } from "lucide-react";

export default async function Login(){
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center px-4">

            <div className="text-center mb-10 ">

                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-xl mb-4">
                    <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>

                <h1
                    className="text-3xl text-foreground"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                    AtendeMonitor
                </h1>

                <p className="text-muted-foreground text-sm mt-1">
                    Sistema de monitorias acadêmicas
                </p>

            </div>


            <div className="w-full max-w-md flex flex-col space-y-4">

                <p className="text-center text-sm text-muted-foreground mb-6">
                    Como você vai acessar o sistema?
                </p>

                <LoginButton userType="aluno" />
                <LoginButton userType="monitor" />

            </div>
        </div>
    )
}