import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

/**
 * @swagger
 * /api/posts:
 *   post:
 *     tags: 
 *       - posts
 *     summary: Create a post
 *     description: Creates a post, requires the user to be logged in!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *                 example: Hello World!
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/post'
 *         description: Returns created post
 */

export async function POST(request: NextRequest) {
    try {
        const { body, userId } = await request.json();

        const createdPost = await prismadb.post.create({
            data: {
                body,
                userId
            }
        })

        return NextResponse.json(createdPost);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

/**
 * @swagger
 * /api/posts:
 *   get:
 *     tags: 
 *       - posts
 *     summary: Fetch posts
 *     description: Fetches a single post if provided with UserID, if not, it will fetch everything.
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

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        let posts;

        if (userId) {
            posts = await prismadb.post.findMany({
                where: {
                    userId
                },
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc'
                },
            });
        } else {
            posts = await prismadb.post.findMany({
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        return NextResponse.json(posts);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}