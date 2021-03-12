import prisma from '../../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const postId = req.query.id;
        const post = await prisma.post.delete({
            where: {
                id: Number(postId)
            }
        });
        res.json(post)
    }
    else {
        throw new Error(" The HTTP ${req.method} method is not supported at this route.");
    }
}