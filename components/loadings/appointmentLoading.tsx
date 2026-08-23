export const states: string[] = ["Todos", "Agendados", "Realizados"]

export default function AppointmentLoading(){
    return (
        <div className="flex-1 flex flex-col gap-8">

            <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Histórico</p>
                <h1 className="text-3xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Meus atendimentos</h1>
            </div>

            <div className="flex gap-2 flex-wrap">
                { states.map((f, index) => (
                    <div 
                    key={index} 
                    className={`px-3.5 py-2 rounded text-sm font-mono transition-all cursor-pointer
                    bg-card text-foreground hover:border-primary/40`}
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