export default function DashboardLoading(){
    return (
        <div className="w-full h-full flex flex-col gap-8">

            <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Bem-vindo,</p>
                <h1 className="text-2xl text-foreground leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  ...
                </h1>       
            </div>

            <div className="w-full h-23 flex max-sm:gap-2 gap-5">
                <div className="bg-card w-[33%] rounded" />
                <div className="bg-card w-[33%] rounded" />
                <div className="bg-card w-[33%] rounded" />
            </div>

            <div className="w-full h-40 bg-primary rounded" />
                <h2 className="text-xl text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Acesso rápido</h2>

                <div className="grid grid-cols-2 gap-3">
                {
                    [0,1].map((e) => (
                        <div 
                            key={e}  
                            className={`bg-card border border-border rounded-lg p-4 text-left hover:border-primary/40 
                            hover:shadow-sm transition-all h-20 flex-1`}
                        >
                        </div>
                    ))
                }
            </div>
        </div>
    )
}