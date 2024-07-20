import { User } from "@/app/models/user";
import { connectDB, cookieSetter, generateToken } from "@/app/utils/features";
import { asyncError, errorHandler } from "@/middleware";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";

export async function POST(req, con) {
    const res = await handler(req);
    const body = await res.json();
    console.log('body ', body);

    cookies().set({
        name: 'todo',
        value : body.token,
        httpOnly: true,
        //secure: isSecure,
        maxAge: 60 * 60, // 2 minutes
        path: '/',
    })

    return NextResponse.json({
        success: true,
        message : "Registered successfully",
        user : body.user,
    })
}

export const handler = asyncError(async (req, res) => {

    try {
        const body = await req.json();
        // console.log('body : ', body);
        const { name, email, password } = body;

        if (!name || !email || !password)
            return errorHandler(res, 400, "please enter all fields");

        // It helps in connecting databse
        await connectDB();

        let user = await User.findOne({ email });

        if (user) return errorHandler(res, 400, "User registered with this email");

        // Here we are hashing the password so that no one can easily see it 
        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password : hashedPassword,
        });

        // Here we are generating a token on the basis of user._id
        const token = generateToken(user._id);

        return NextResponse.json({
            user,
            token,
        });

    } catch (error) {
        console.log(error);
    }
});
