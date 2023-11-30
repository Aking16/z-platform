import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { userId: string } }) {
    try {
        const userId = params.userId;

        const posts = await prismadb.post.findMany({
            where: {
                userId
            },
            include: {
                user: true,
                comments: true
            },
            orderBy: {
                createdAt: 'desc'
            },
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}