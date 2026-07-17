export const states: string[] = ["Todos", "Agendados", "Realizados"]

export default function AppointmentLoading(){
    return (
        <div className="flex-1 flex flex-col gap-8 mt-7">
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

            <div 
            className={`w-full h-27 bg-card rounded-lg p-5 text-left hover:shadow-md hover:border-primary/30 cursor-pointer
            transition-all group border-border`} />

            <div 
            className={`w-full h-27 bg-card rounded-lg p-5 text-left hover:shadow-md hover:border-primary/30 cursor-pointer
            transition-all group border-border`} />

            <div 
            className={`w-full h-27 bg-card rounded-lg p-5 text-left hover:shadow-md hover:border-primary/30 cursor-pointer
            transition-all group border-border`} />
        </div>  
    )
}