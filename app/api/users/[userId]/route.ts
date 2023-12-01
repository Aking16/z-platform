import bcrypt from "bcrypt"
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest, { params }: { params: { userId: string } }) {
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