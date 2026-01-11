
import dotenv from "dotenv";
dotenv.config();

// @ts-ignore
import { db } from "../src/lib/db";

async function main() {
    console.log("Testing DB connection...");
    try {
        const count = await db.user.count();
        console.log(`User count: ${count}`);
        console.log("Connection successful!");
    } catch (error) {
        console.error("Connection failed:", error);
    }
}

main();
