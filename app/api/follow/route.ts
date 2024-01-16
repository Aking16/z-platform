import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

/**
 * @swagger
 * /api/follow:
 *   post:
 *     tags: 
 *       - users
 *     summary: Follows a user
 *     description: Follows a user!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 6e58944f-89b1-48c0-853d-cf0a6c4b4df2
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

export async function POST(request: NextRequest) {
    try {
        const { followerId, followId } = await request.json();

        if (!followerId || typeof followerId !== 'string') {
            return new NextResponse("Invalid ID", { status: 400 })
        }
        if (!followId || typeof followId !== 'string') {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        const user = await prismadb.user.findUnique({
            where: {
                id: followId
            }
        })

        let updatedFollowingIds = [...(user?.followingIds || [])];

        updatedFollowingIds.push(followId);

        const updatedUser = await prismadb.user.update({
            where: {
                id: followerId
            },
            data: {
                followingIds: updatedFollowingIds
            }
        })

        // try {
        //     await prismadb.notification.create({
        //         data: {
        //             body: `${currentUser.name} followed you!`,
        //             userId
        //         }
        //     })

        //     await prismadb.user.update({
        //         where: {
        //             id: userId
        //         },
        //         data: {
        //             hasNotficiation: true
        //         }
        //     })
        // } catch (error) {
        //     console.log(error);
        // }

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

/**
 * @swagger
 * /api/follow:
 *   delete:
 *     tags: 
 *       - users
 *     summary: Unfollows a user
 *     description: Unfollows a user!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 6e58944f-89b1-48c0-853d-cf0a6c4b4df2
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

export async function DELETE(request: NextRequest) {
    try {
        const { followerId, followId } = await request.json();

        if (!followerId || typeof followerId !== 'string') {
            return new NextResponse("Invalid ID", { status: 400 })
        }
        if (!followId || typeof followId !== 'string') {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        const user = await prismadb.user.findUnique({
            where: {
                id: followId
            }
        })

        let updatedFollowingIds = [...(user?.followingIds || [])];

        updatedFollowingIds.filter((followingId) => followingId !== followId);


        const updatedUser = await prismadb.user.update({
            where: {
                id: followerId
            },
            data: {
                followingIds: updatedFollowingIds
            }
        })

        // try {
        //     await prismadb.notification.create({
        //         data: {
        //             body: `${currentUser.name} unfollowed you!`,
        //             userId
        //         }
        //     })

        //     await prismadb.user.update({
        //         where: {
        //             id: userId
        //         },
        //         data: {
        //             hasNotficiation: true
        //         }
        //     })
        // } catch (error) {
        //     console.log(error);
        // }

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}