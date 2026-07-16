import Image from "next/image";
import Link from "next/link";

export default function NotFound(){
    return (
        <div className="h-screen w-full flex items-center justify-center flex-col gap-2">
            <h1 className="text-3xl">Page not found</h1>
            <p className="text-foreground! text-sm">
                Please go back to <Link className="bg-primary px-2 py-1 ml-0.5 rounded hover:bg-accent" href={"/dashboard"}>home</Link>
            </p>
            <Image 
                className="mt-2 rounded"
                src="/mai.jpg" 
                alt={"not found image"} 
                width={300} 
                height={100}  />
        </div>
    )   
}