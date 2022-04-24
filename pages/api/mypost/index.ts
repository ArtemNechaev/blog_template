import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req })
    if (session) {
        const posts = await prisma.post.findMany({
            where: {
                author: {id: session.user.id}
            },
            include: {
                author: {
                    select: {name: true}
                }
            }
        })
        res.json(posts)
    }
    else {
        res.status(403)
    }
    res.end()
}