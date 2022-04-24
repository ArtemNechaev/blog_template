import { getSession } from 'next-auth/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { Post, Theme } from '.prisma/client'
import { truncate } from 'node:fs';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const allPosts = await getDrafts();
      res.json(allPosts)
      break;
    case 'POST':
      const { title, content } = req.body
      const session = await getSession({ req })
      if (session) {
        const result = await prisma.post.create({
          data: {
            title: title,
            mainpart: content,
            published: true,
            author: {
              connect: {
                id: session?.user?.id
              }
            },
            theme: {
              connect: {
                id: 1
              }
            }
          },
          include: {
            author: true,
            theme: true
          }
        })
        res.json(result);
        break;
      }
      else {
        res.status(403);
      }
      res.end();

    default: throw new Error(" The HTTP ${req.method} method is not supported at this route.");
  }

}

export const getDrafts = async (): Promise<Array<{
  name: string, posts: {
    id: number,
    title: string,
    introduction: string
  }[]
}>> => {
  const allPosts = await prisma.theme.findMany({
    select: {
      id: true,
      name: true,
      posts: {
        select: {
          id: true,
          title: true,
          introduction: true
        },
        where: {
          published: true
        }
      }
    }
  })
  return allPosts;
}