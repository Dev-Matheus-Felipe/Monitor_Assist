"use client"

import { departmentsProfile } from "@/lib/generals";
import editProfile from "@/lib/serverFunctions/editProfile";
import { editProfileSchema } from "@/lib/zod/editProfile";
import { MonitorWithSlots } from "@/types/monitor/monitorTypes";
import { ArrowDown, Pencil, Star } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type DepartamentType = {
    value: string,
    open: boolean
}

export default function EditFuncsPage({
    monitor,
    user
} : {
    monitor: MonitorWithSlots,
    user: Session["user"]
}){

    const [department, setDepartment] = useState<DepartamentType>({value: monitor.department ?? "Undefined", open: false});
    const [bio, setBio] = useState<string>(monitor.bio ?? "");

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const router = useRouter();

    const edit = async() => {
        // valida os dados
        const valid = editProfileSchema.safeParse({department: department.value, bio});

        if(!valid.success){
            toast.error(valid.error.issues[0].message);
            return;
        }

        // edita o perfil e gerencia o retorno dado pela função
        const response = await editProfile({department: department.value, bio});
        
        if(response.status){
            setIsEditing(false);

            toast.success(response.message);
            router.refresh();
        
        } else toast.error(response.message);

    }

    return (
        <div className="bg-card border border-border rounded-lg p-6 mt-6 relative flex flex-col">
            <button className={`absolute right-2 top-2 px-2 py-2 max-sm:px-1.5 max-sm:py-1.5 bg-primary cursor-pointer  
            text-primary-foreground rounded hover:opacity-90 transition-opacity font-medium`}
            onClick={()=> setIsEditing(prev => !prev)}>
                <Pencil size={12} />
            </button>

            <div className="flex items-start gap-5 mt-2">
                <Image
                    src={user.image ?? ""} 
                    alt="Monitor Image" 
                    width={35} 
                    height={35}
                    className="rounded-full" 
                />

                <div className="flex-1">
                    <div className="flex gap-2 items-center">
                        <h2 className="font-medium text-xl text-foreground">{user.name}</h2>

                        <div className="flex items-center gap-1 ">
                            <Star size={12}/>
                            <p>{monitor.rating}</p>
                        </div>
                    </div>

                    {!isEditing ?  
                        <>
                            <p className="text-accent font-medium mt-0.5">{monitor.department ?? "Undefined"}</p>
                            <div className="flex items-center gap-4 mt-4">
                                <span className="text-xs font-mono text-muted-foreground">
                                    {monitor.totalSessions} atendimentos realizados
                                </span>
                            </div>
                        </> : 
                        
                        <div className={`mt-3 relative h-auto w-full ${!department.open && "overflow-hidden"} bg-card`}>
                            <p className="border h-full w-fit p-3 text-xs rounded cursor-pointer bg-card flex gap-2 items-center"
                            onClick={()=> setDepartment(prev => ({value: prev.value, open: !prev.open}))}>
                                {department.value}
                                <ArrowDown size={12} />
                            </p>

                            <div className="absolute rounded-md shadow-lg z-10 bg-card">
                            {departmentsProfile.map((d) => (
                                <button
                                key={d}
                                type="button"
                                className={`block w-full px-3 py-2 text-left text-sm cursor-pointer`}
                                onClick={() => setDepartment(prev => ({value: d, open: !prev.open}))}
                                >
                                {d}
                                </button>
                            ))}
                            </div>
                        </div>
                    }

                    
                </div>
            
            </div>
            
            { !isEditing 
                ? <p className="text-sm text-foreground/70 mt-4 leading-relaxed border-t border-border pt-4 break-words">
                    {monitor.bio}
                </p>

                : <textarea 
                    className={`border border-primary w-full mt-5 text-sm px-3 py-3 h-20 resize-none`}
                    value={bio} 
                    maxLength={250}
                    placeholder="Edite sua descrição aqui..."
                    onChange={(e) => setBio(e.target.value)} />
            }

            { isEditing &&
                <div className="w-full flex justify-start">
                    <button className={`bg-primary mt-5 text-white px-3 py-1.5 rounded text-sm 
                    cursor-pointer hover:opacity-90 transition-opacity`}
                    onClick={() => edit()}>
                        Confirmar
                    </button>
                </div>
            }
      </div>
    )
}