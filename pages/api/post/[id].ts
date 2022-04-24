import prisma from '../../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const postId = req.query.id;
    let post;
    switch (req.method) {
        case 'DELETE':
            post = await prisma.post.delete({
                where: {
                    id: Number(postId)
                }
            });
            res.json(post);
            break;
        case 'PUT':
            const { title, introduction, mainpart, conclusion } = req.body
            post = await prisma.post.update({
                where: { id: Number(postId) },
                data: {
                    ...req.body
                },
            })
            res.json(post);
            break;
        case 'GET':
            post = await prisma.post.findUnique({
                where: {id: Number(postId)},
                include: {
                    author: {
                        select:{name: true, email: true, id: true}
                    }
                }
            })
            res.json(post);
            break;
        default: throw new Error(" The HTTP ${req.method} method is not supported at this route.");
    }
}