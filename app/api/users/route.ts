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

export async function GET(request: NextRequest) {
    try {
        const users = await prismadb.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}