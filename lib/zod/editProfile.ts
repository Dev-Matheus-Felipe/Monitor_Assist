import z from "zod";
import { departmentsProfile } from "../generals";

export const editProfileSchema= z.object({
    department: z.enum(departmentsProfile),
    bio: z.string().min(5, "Min Length: 5").max(250, "Max Length: 250")
})
