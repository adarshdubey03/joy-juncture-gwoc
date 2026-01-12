
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import 'dotenv/config'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    const count = await prisma.product.count()
    console.log(`Product count: ${count}`)
    const products = await prisma.product.findMany({ select: { name: true, slug: true } })
    console.log('Products:', products)
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
