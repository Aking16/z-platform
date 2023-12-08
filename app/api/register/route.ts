import bcrypt from "bcrypt"
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/register:
 *   post:
 *     tags: 
 *       - users
 *     summary: Create a user
 *     description: Creates a user!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@z.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               username:
 *                 type: string
 *                 example: Aking16
 *               name:
 *                 type: string
 *                 example: Amirhossein Amiri
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 *         description: Returns created user
 */

export async function POST(request: NextRequest) {
    try {
        const { email, password, username, name } = await request.json();

        if (!email || !username || !password) {
            return new NextResponse("Missing Info", { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                username,
                name,
                hashedPassword
            }
        })

        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}