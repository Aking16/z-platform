import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/edit:
 *   patch:
 *     tags: 
 *       - users
 *     summary: Edits a user
 *     description: Edits a user!
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profileImage:
 *                 type: string
 *                 format: binary
 *               coverImage:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 *         description: Returns updated user
 */

export async function PATCH(request: NextRequest) {
    try {
        const {userId, name, username, bio} = await request.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const currentUser = await prismadb.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!currentUser?.id) {
            return new NextResponse("Missing Info", { status: 400 })
        }

        const updatedUser = await prismadb.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name,
                username,
                bio,
            }
        })

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}