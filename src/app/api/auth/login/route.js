import { User } from "@/app/models/user";
import { connectDB, cookieSetter, generateToken } from "@/app/utils/features";
import { asyncError, errorHandler } from "@/middleware";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { serialize } from "cookie";
import { cookies } from "next/headers";

export async function POST(req) {
    console.log('this is first');
    const ans = await handler(req);
    const body = await ans.json();
    const { user, token, isSecure } = body;
    console.log('post ans : ', ans);
    console.log('post body : ', body);


    // This is how we set cookies in nextjs
    cookies().set({
        name: 'todo',
        value : token,
        httpOnly: true,
        //secure: isSecure,
        maxAge: 60 * 60, // 2 minutes
        path: '/',
    })

    return NextResponse.json({
        success: true,
        message: `welcome back ${user.name}`,
        user,
    })
}

export const handler = asyncError(async (req) => {

    try {
        const body = await req.json();
        console.log('body : ', body);
        const { email, password } = body;

        if (!email || !password)
            return errorHandler(res, 400, "please enter all fields");

        // It helps in connecting databse
        await connectDB();

        // we have used select fn here bcz in our user model we have wrote  select as false so when we compare the password from user.password we will not get it so  have used select fn
        const user = await User.findOne({ email }).select('+password');

        if (!user) return errorHandler(res, 400, "Invalid email or password");

        // Here we are hashing the password so that no one can easily see it 
        const isMatch = await bcrypt.compare(password, user.password);

        console.log('user : ', user);
        console.log('isMatch : ', isMatch);
        if (!isMatch) return errorHandler(res, 400, "Invalid email or password");


        // Here we are generating a token on the basis of user._id
        const token = generateToken(user._id);
        console.log('token : ', token);

        return NextResponse.json({
            user,
            token,
            isSecure: true,
        });

    } catch (error) {
        console.log(error);
    }
});
