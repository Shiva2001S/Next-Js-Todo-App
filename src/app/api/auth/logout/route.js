import { User } from "@/app/models/user";
import { connectDB, cookieSetter, generateToken } from "@/app/utils/features";
import { asyncError, errorHandler } from "@/middleware";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { serialize } from "cookie";
import { cookies } from "next/headers";

export async function GET(req) { 

    // This is how we delete cookies in nextjs
    cookies().delete('todo');

    let response = NextResponse.json({
        success: true,
        message: `Logged out successfully`,
    },{status: 200});

    return response;
}
