import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request){
    const {searchParams} = new URL(req.url);
    const session = await auth();

    const role = searchParams.get("role") || "aluno";

    if (!session?.user?.email) {
        return Response.json({ error: "Not logged in" }, { status: 401 });
    }

    await prisma.user.update({
        where: {email: session.user.email},
        data: {role: role}
    });

    return Response.redirect(new URL("/dashboard", req.url));
}