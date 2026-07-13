import { DataType } from "@/lib/home/getHomeData";

export default function Boxes({data} : {data: DataType[]}){
    return (
        <div className="grid grid-cols-3 gap-4 max-sm:gap-2">
            {
                data.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="bg-card border border-border rounded-lg p-4 max-sm:p-2">
                        <div className="flex items-center max-sm:gap-1 gap-2 mb-2">
                            <Icon className="min-w-3 min-h-3 max-w-4 max-h-4 text-muted-foreground" />
                            <span className="max-sm:text-xs text-xs font-mono text-muted-foreground uppercase tracking-wide">
                                {label}
                            </span>
                        </div>

                        <p 
                            className="text-3xl max-sm:text-lg text-foreground" 
                            style={{ fontFamily: "'Instrument Serif', serif" }}>
                                {value}
                        </p>
                    </div>
                ))
            }
        </div>
    );
}