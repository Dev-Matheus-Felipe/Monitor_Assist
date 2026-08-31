"use server"

import { auth } from "../auth"


export default async function getSessionFunc(){
    const session = await auth();

    return session;
}