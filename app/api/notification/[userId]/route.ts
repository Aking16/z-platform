import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const userId = params.userId;

        if (!userId || typeof userId !== 'string') {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        const notifcations = await prismadb.notification.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        await prismadb.user.update({
            where: {
                id: userId
            },
            data: {
                hasNotficiation: false
            }
        });

        return NextResponse.json(notifcations);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const notifId = searchParams.get("notifId");

        if (!notifId || typeof notifId !== 'string') {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        await prismadb.notification.delete({
            where: {
                id: notifId
            }
        });

        return NextResponse.json("Notification Deleted");
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}