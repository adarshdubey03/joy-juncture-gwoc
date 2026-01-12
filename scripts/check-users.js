
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

async function main() {
    console.log('Fetching users...');
    const users = await prisma.user.findMany({
        include: {
            accounts: true
        }
    });
    console.log('Total users:', users.length);
    console.log(JSON.stringify(users, null, 2));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
