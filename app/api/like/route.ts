import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

/**
 * @swagger
 * /api/like:
 *   post:
 *     tags: 
 *       - posts
 *     summary: Likes a post
 *     description: Likes a user!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 example: 65bf142c-1016-4a3a-912f-bb48458845ae
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/post'
 *         description: Returns updated post
 */

export async function POST(request: NextRequest) {
    try {
        const { postId } = await request.json();

        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!postId || typeof postId !== 'string') {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        const currentUser = await prismadb.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        const post = await prismadb.post.findUnique({
            where: {
                id: postId
            }
        })

        if (!currentUser?.id) {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        let updatedLikedIds = [...(post?.likedIds || [])];

        updatedLikedIds.push(currentUser.id);

        const updatedPost = await prismadb.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        })

        try {
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
                        body: `${post.user.name} liked your post!`,
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
        }

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

/**
 * @swagger
 * /api/like:
 *   delete:
 *     tags: 
 *       - posts
 *     summary: Unlikes a post
 *     description: Unlikes a user!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 example: 65bf142c-1016-4a3a-912f-bb48458845ae
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/post'
 *         description: Returns updated post
 */

export async function DELETE(request: NextRequest) {
    try {
        const { postId } = await request.json();

        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!postId || typeof postId !== 'string') {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        const currentUser = await prismadb.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        const post = await prismadb.post.findUnique({
            where: {
                id: postId
            }
        })

        if (!currentUser?.id) {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        let updatedLikedIds = [...(post?.likedIds || [])];

        updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser.id);

        const updatedPost = await prismadb.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        })

        try {
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
                        body: `${post.user.name} unliked your post!`,
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
        }

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}