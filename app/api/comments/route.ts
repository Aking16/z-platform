import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";


/**
 * @swagger
 * /api/comments?postId=ID:
 *   post:
 *     tags: 
 *       - posts
 *     summary: Comments on a post
 *     description: Comments on a post!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post:
 *                 type: string
 *                 example: "Hello World!"
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/comment'
 *         description: Returns comment
 */

export async function POST(request: NextRequest) {
    try {
        const { post, userId, postId } = await request.json();

        if (!userId) {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        if (!postId) {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        const comment = await prismadb.comment.create({
            data: {
                body: post,
                userId,
                postId,
            }
        })

        /*try {
            const post = await prismadb.post.findUnique({
                where: {
                    id: postId
                },
                include: {
                    user: true
                }
            })

            if (post?.userId) {
                await prismadb.notification.create({
                    data: {
                        body: `${currentUser.name} replied to your post!`,
                        userId: post.userId
                    }
                })

                await prismadb.user.update({
                    where: {
                        id: post.userId
                    },
                    data: {
                        hasNotficiation: true
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }*/

        return NextResponse.json(comment);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}