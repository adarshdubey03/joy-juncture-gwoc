import * as z from "zod";

export const LoginSchema = z.object({
    email: z.email({message : "Email is required"}),
    password : z.string().min(1 , {message : ""}),
});


export const RegisterSchema = z.object({
    email: z.email({message : "Email is required"}),
    password : z.string().min(8 , {message : ""}),
    name : z.string().min(3,{message : " name must be of 3 letter"})
});