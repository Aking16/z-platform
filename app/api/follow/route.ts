import bcrypt from "bcrypt"
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
    try {
        const { userId } = await request.json();

        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const currentUser = await prismadb.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        const user = await prismadb.user.findUnique({
            where: {
                id: userId
            }
        })

        
        if (!currentUser?.id) {
            return new NextResponse("Missing Info", { status: 400 })
        }

        let updatedFollowingIds = [...(user?.followingIds || [])];

        updatedFollowingIds.push(userId);

        const updatedUser = await prismadb.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingIds: updatedFollowingIds
            }
        })

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { userId } = await request.json();

        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const currentUser = await prismadb.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        const user = await prismadb.user.findUnique({
            where: {
                id: userId
            }
        })

        
        if (!currentUser?.id) {
            return new NextResponse("Missing Info", { status: 400 })
        }

        let updatedFollowingIds = [...(user?.followingIds || [])];

        updatedFollowingIds.filter(followingId => followingId !== userId);

        const updatedUser = await prismadb.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingIds: updatedFollowingIds
            }
        })

        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}