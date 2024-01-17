import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/notification/[userId]:
 *   get:
 *     tags: 
 *       - notification
 *     summary: Fetch notifications
 *     description: Fetches notifications then updates user hasNotification to false
 *     parameters:
 *       - in: json
 *         name: userId
 *         description: ID of the user.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/notification'
 *         description: Returns fetched notifications
 */

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

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

/**
 * @swagger
 * /api/notification/[userId]?notifId=ID:
 *   delete:
 *     tags: 
 *       - notification
 *     summary: Deletes a notification
 *     description: Fetches notifications then updates user hasNotification to false
 *     parameters:
 *       - in: json
 *         name: userId
 *         description: ID of the user.
 *         required: true
 *         schema:
 *           type: string
 *       - in: json
 *         name: notifId
 *         description: ID of the notification.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *              type: string
 *              example: Notification Deleted
 */

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