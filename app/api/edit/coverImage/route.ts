import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { existsSync } from "fs";
import fs from "fs/promises";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import prismadb from "@/lib/prismadb";

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

export async function PATCH(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const formData = await req.formData();

        const urlCI = await req.url.split('api')[0] + "upload/cover-images/"

        const coverImage = formData.get("coverImage");

        if (!coverImage) {
            return NextResponse.json("File Not Found", { status: 400 });
        }

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const currentUser = await prismadb.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if (!currentUser?.id) {
            return new NextResponse("Missing Info", { status: 400 })
        }

        const coverImageFile = coverImage as File;

        const coverImageDir = path.join(process.cwd(), "public/upload/cover-images");

        const coverImageFileArrayBuffer = await coverImageFile.arrayBuffer();

        if (!existsSync(coverImageDir)) {
            fs.mkdir(coverImageDir, { recursive: true });
        }

        await fs.writeFile(
            path.join(coverImageDir, coverImageFile.name),
            Buffer.from(coverImageFileArrayBuffer),
        );

        const updatedUser = await prismadb.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                coverImage: urlCI + coverImageFile.name
            }
        })

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}