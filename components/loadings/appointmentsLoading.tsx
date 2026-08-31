const states: string[] = ["Todos", "Agendados", "Realizados"];


export default function AppointmentsLoading(){
    return (
        <div className="flex-1 flex flex-col gap-8">
            <div className="flex gap-2 flex-wrap">
                { states.map((f, index) => (
                    <div 
                    key={index} 
                    className={`px-3 py-1.5 rounded border text-sm font-mono transition-all cursor-pointer mt-7
                    border-border bg-card text-foreground hover:border-primary/40
                    ${f == "Todos" && "bg-primary text-white" }`}
                    >
                        {f}
                    </div>
                ))}
            </div>


            <div className="w-full flex justify-center mt-10">
                <div className="w-8 h-8 border-4 border-background border-t-primary rounded-full animate-spin" />
            </div>
        </div>
    )
}