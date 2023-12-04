import { NextRequest, NextResponse } from "next/server";
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";

export async function PATCH(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const formData = await req.formData();

        let url = await req.url;
        url = url.split('api')[0] + "upload/"

        const f = formData.get("file");
        const name = formData.get("name")?.toString();
        const username = formData.get("username")?.toString();
        const bio = formData.get("bio")?.toString();

        if (!f) {
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

        const file = f as File;
        console.log(`File name: ${file.name}`);
        console.log(`Content-Length: ${file.size}`);

        const destinationDirPath = path.join(process.cwd(), "public/upload");
        console.log(destinationDirPath);

        const fileArrayBuffer = await file.arrayBuffer();

        if (!existsSync(destinationDirPath)) {
            fs.mkdir(destinationDirPath, { recursive: true });
        }
        await fs.writeFile(
            path.join(destinationDirPath, file.name),
            Buffer.from(fileArrayBuffer)
        );

        const updatedUser = await prismadb.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name,
                username,
                bio,
                profileImage: url + file.name
            }
        })

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}