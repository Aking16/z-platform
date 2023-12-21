import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/users/[userId]:
 *   get:
 *     tags: 
 *       - users
 *     summary: Fetches selected user
 *     description: Fetches selected user, used for profile!
 *     parameters:
 *       - in: json
 *         name: userId
 *         description: ID of the user.
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
 *                 $ref: '#/components/schemas/user'
 *         description: Returns users
 */

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const userId = params.userId;

        if (!userId || typeof userId !== 'string') {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        const exsitingUser = await prismadb.user.findUnique({
            where: {
                id: userId
            }
        })

        const followersCount = await prismadb.user.count({
            where: {
                followingIds: {
                    has: userId
                }
            }
        })
 
        return NextResponse.json({ ...exsitingUser, followersCount});
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}