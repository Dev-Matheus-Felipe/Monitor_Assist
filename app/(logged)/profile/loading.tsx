export default function Loading(){
    return (
        <div className="w-full h-full flex flex-col gap-5 pb-6">
            <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Informações</p>
                <h1 className="text-3xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Meu Perfil</h1>
            </div>

            <div className="bg-card h-40 rounded-lg p-6 mt-6 relative flex flex-col"/>
            <div className="bg-card flex-1 rounded-lg"/>
        </div>
    )
}