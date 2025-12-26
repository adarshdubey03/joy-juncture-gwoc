"use server";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import {db} from "@/lib/db"

export  const  login = async (values : z.infer<typeof LoginSchema>)=>{
    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields.success){
        return { error : " Invalud values"}
    }
 
    return { success : " email sent"}
}