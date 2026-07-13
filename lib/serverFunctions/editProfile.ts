"use server"

import { ServerSideResponse } from "@/types/generals";
import { auth } from "../auth"
import { prisma } from "../prisma";
import { editProfileSchema } from "../zod/editProfile";

export default async function editProfile({
    department,
    bio
} : {
    department: string,
    bio: string
}):Promise<ServerSideResponse> {
    const session = await auth();

    const valid = editProfileSchema.safeParse({department, bio});

    if(!valid.success)  return {status: false, message: valid.error.issues[0].message};
    
    if(!session?.user || session.user.activeProfile !== "monitor")
        return {status: false, message: "Not allowed"};

    try {
        await prisma.monitor.update({
            where: {userId: session.user.id},
            data: {
                bio: bio,
                department: department
            }
        })

        return {status: true, message: "Profile updated successfully."};
        
    } catch (error) {
        return {status: false, message: "Internal databse Error."};

    }
}