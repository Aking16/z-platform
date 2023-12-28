import bcrypt from "bcrypt"
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return new NextResponse("Missing Info", { status: 400 })
        }

        const user = await prismadb.user.findUnique({
            where: {
                email,                
            }
        })

        if (!user?.hashedPassword){
            return new NextResponse("Missing Info", { status: 400 })
        }

        const isCorrectPassword = await bcrypt.compare(
            password,
            user.hashedPassword
        )

        if (!isCorrectPassword) {
            return new NextResponse("Missing Info", { status: 400 })
        }

        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}