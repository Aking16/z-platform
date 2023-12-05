import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";

export async function POST(request: NextRequest) {
    try {
        const { post } = await request.json();
        const { searchParams } = new URL(request.url);
        const postId = searchParams.get("postId");
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!postId || typeof postId !== 'string') {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        const currentUser = await prismadb.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if (!currentUser?.id) {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        const comment = await prismadb.comment.create({
            data: {
                body: post,
                userId: currentUser.id,
                postId,
            }
        })

        try {
            const post = await prismadb.post.findUnique({
                where: {
                    id: postId
                },
                include: {
                    user: true
                }
            })

            if (post?.userId) {
                await prismadb.notification.create({
                    data: {
                        body: `${currentUser.name} replied to your post!`,
                        userId: post.userId
                    }
                })

                await prismadb.user.update({
                    where: {
                        id: post.userId
                    },
                    data: {
                        hasNotficiation: true
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }

        return NextResponse.json(comment);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}