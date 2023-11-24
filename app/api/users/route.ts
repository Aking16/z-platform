import bcrypt from "bcrypt"
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const users = await prismadb.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}