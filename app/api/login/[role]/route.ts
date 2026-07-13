import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// end point responsável por lidar logins feitos na plataforma, os parametros tem que serem assincronos
export async function GET(
    req: Request,
    { params }: { params: Promise<{ role: string }> }
) {
    const { role } = await params;
    const session = await auth();

    // caso seja uma role invalida ou o usuário não esteja logado impedir a continuação
    if(!session?.user.id || (role != "aluno" && role != "monitor")) 
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        );

    if(role == "monitor"){
        const user = await prisma.user.findUnique({
            where: {id: session.user.id},
            include: {monitor: true}
        });

        // caso o usuário esteja logando como monitor e ainda não ser um monitor
        if(!user?.monitor){
            await prisma.monitor.create({
                data: {
                    userId: session.user.id,
                    department: "Undefined"
                }
            });
        }
    }

    // atualizar o método de login na sessão atual
    await prisma.user.update({
        where: {id: session.user.id},
        data: {activeProfile: role}
    })

    // redirecionar para a home depois de finalizado
    return Response.redirect(new URL("/dashboard", req.url));
}