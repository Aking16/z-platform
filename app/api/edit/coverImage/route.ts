import prismadb from "@/lib/prismadb";
import { existsSync } from "fs";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

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
        const formData = await req.formData();
        
        const urlPI = process.env.NEXTAUTH_URL + "/upload/cover-images/"
        
        const coverImage = formData.get("coverImage");
        const userId = formData.get("userId");
        
        if (!coverImage) {
            return NextResponse.json("File Not Found", { status: 404 });
        }

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        const currentUser = await prismadb.user.findUnique({
            where: {
                id: userId as string
            }
        })
        
        if (!currentUser?.id) {
            return new NextResponse("Missing Info", { status: 400 })
        }

        const coverImageFile = coverImage as File;

        const coverImageDir = path.join(process.cwd(), "public/upload/cover-images");

        const coverImageArrayBuffer = await coverImageFile.arrayBuffer();

        if (!existsSync(coverImageDir) ) {
            fs.mkdir(coverImageDir, { recursive: true });
        }
        await fs.writeFile(
            path.join(coverImageDir, coverImageFile.name),
            Buffer.from(coverImageArrayBuffer),
        );

        const updatedUser = await prismadb.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                coverImage: urlPI + coverImageFile.name,
            }
        })

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}