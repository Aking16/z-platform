import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
    try {
        const { postId } = await request.json();

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

        const post = await prismadb.post.findUnique({
            where: {
                id: postId
            }
        })

        if (!currentUser?.id) {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        let updatedLikedIds = [...(post?.likedIds || [])];

        updatedLikedIds.push(currentUser.id);

        const updatedPost = await prismadb.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
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
                        body: `${post.user.name} liked your tweet!`,
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

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { postId } = await request.json();

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

        const post = await prismadb.post.findUnique({
            where: {
                id: postId
            }
        })

        if (!currentUser?.id) {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        let updatedLikedIds = [...(post?.likedIds || [])];

        updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser.id);

        const updatedPost = await prismadb.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        })

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}