
import { db } from './src/lib/db'

async function main() {
    const blog = await db.blog.findUnique({
        where: { slug: 'murder-mystery-game-night' }
    })
    console.log(blog)
}

main()
