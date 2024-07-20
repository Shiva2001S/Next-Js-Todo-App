import mongoose from "mongoose"
import { Task } from "../models/task";
import { errorHandler } from "@/middleware";
import { serialize } from "cookie";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { User } from "../models/user";
import { NextResponse } from "next/server";
export const connectDB = async (req, res) => {
    // this process.env file can be accessed in server side and api components only
    console.log(process.env.MONGO_URI);
 
    const {connection} = await mongoose.connect(process.env.MONGO_URI, {
        dbName : "NextTodo",
    });
    console.log(`Database connected on ${connection.host}`);
};

export const handler = async (req, res) => {

    await connectDB();
    console.log('req 2 : ', req);

    const {title, description} = req;

    if(!title || !description) return errorHandler(res, 400, "Please enter all the fields");

    const user = await checkAuth(req);
    
    await Task.create({
        title, 
        description, 
        user : user._id,
    });
}

export const cookieSetter = (response, token, isSecure) => {
    
    response.headers.set(
        'Set-Cookie',
        serialize('sk', token, {
            httpOnly: true,
            secure: isSecure,
            maxAge: 60 * 60, // 24 hours
            path: '/',
            sameSite: 'strict',
        })
    );

    return response;
};

export const generateToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET);
}

export const checkAuth = async(req) => {
    
    let token = await cookies().get('todo')?.value;

    console.log('token ', token);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('decoded ', decoded);

    return await User.findById(decoded._id);

}

