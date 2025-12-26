"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcrypt"
import {db} from "@/lib/db"

export  const  register = async (values : z.infer<typeof RegisterSchema>)=>{
    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success){
        return { error : " Invalud values"}
    }
    const {email , password , name } = validatedFields.data;
    const existingUser = await db.user.findUnique({
        where : {
            email 
        }
    });
     
    if(existingUser){
        return {error :"email already exixts!! "}
    }

    const hashedPassword = await bcrypt.hash(password,10);
    await db.user.create({
        data : {
            name ,
            email ,
        },
    });
    return { success : " email sent"}
}