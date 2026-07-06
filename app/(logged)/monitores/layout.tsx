

export default function MonitoresLayout({
    children, newAtendt
} : {
    children: React.ReactNode,
    newAtendt: React.ReactNode
}){
    return (
        <div className="flex flex-1 ">
            {newAtendt}
            {children}
        </div>
    )
}