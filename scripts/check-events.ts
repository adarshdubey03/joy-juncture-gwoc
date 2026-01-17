import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is missing from environment variables");
    process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Checking Events in Database...");
    const events = await prisma.event.findMany();

    if (events.length === 0) {
        console.log("No events found in the database.");
        return;
    }

    console.log(`Found ${events.length} events:`);
    console.log("---------------------------------------------------");
    events.forEach(event => {
        console.log(`ID: ${event.id}`);
        console.log(`Title: ${event.title}`);
        console.log(`Start Time: ${event.startTime} (Local: ${event.startTime.toLocaleString()})`);
        console.log(`Is Active: ${event.isActive}`);
        console.log(`Current Server Time: ${new Date().toISOString()}`);

        const isFuture = new Date(event.startTime) >= new Date();
        console.log(`Is Future (startTime >= now): ${isFuture}`);
        console.log(`Should show in Upcoming? ${event.isActive && isFuture}`);
        console.log("---------------------------------------------------");
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
