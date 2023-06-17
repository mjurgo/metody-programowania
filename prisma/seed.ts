import { PrismaClient } from '@prisma/client'
import { v4 } from 'uuid'

import { createHash } from '../src/backend/utils/hash.utils'

const prisma = new PrismaClient()

async function main() {
    const SALT = (process.env.PASSWORD_SALT as string) ?? "ABC";

    const skrzetuski = await prisma.user.upsert({
        where: { email: "skrzetuski@example.com" },
        update: {},
        create: {
            id: v4(),
            email: "skrzetuski@example.com",
            name: "skrzetuski",
            password: createHash("password", SALT),
        },
    })
    console.log(skrzetuski)
}

main()

    .then(async () => {

        await prisma.$disconnect()

    })

    .catch(async (e) => {

        console.error(e)

        await prisma.$disconnect()

        process.exit(1)

    })
