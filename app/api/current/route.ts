import prismadb from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

/**
 * @swagger
 * /api/current:
 *   get:
 *     tags: 
 *       - users
 *     summary: Fetches logged in user
 *     description: Fetches logged in user!
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 *         description: Returns current logged in user
 */

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session.user.email
      }
    })

    return NextResponse.json(currentUser);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}