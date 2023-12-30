import bcrypt from "bcrypt"
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: 
 *       - users
 *     summary: Fetches all of the users
 *     description: Fetches all of the users!
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

export async function POST(request: NextRequest) {
    try {
        const {userId} = await request.json();

        if (!userId || typeof userId !== 'string') {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        const user = await prismadb.user.findUnique({
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

        return NextResponse.json({...user, followersCount});
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}