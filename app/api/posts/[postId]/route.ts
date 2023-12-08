import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/posts/[postId]:
 *   get:
 *     tags: 
 *       - posts
 *     summary: Fetch a post
 *     description: Fetches a single post, used when clicking on a post.
 *     parameters:
 *       - in: json
 *         name: postId
 *         description: ID of the post.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/post'
 *         description: Returns fetched post
 */

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
    try {
        const postId = params.postId;

        if (!postId || typeof postId !== 'string') {
            return new NextResponse("Invalid ID", { status: 500 })
        }

        const post = await prismadb.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}