import prismadb from '@/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';

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

export async function POST(request: NextRequest) {
 
    const { userId } = await request.json();

    const currentUser = await prismadb.user.findUnique({
      where: {
        id: userId
      }
    })

    return NextResponse.json(currentUser);
  
}