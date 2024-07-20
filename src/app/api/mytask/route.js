import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { checkAuth, connectDB, handler} from '../../utils/features'
import { Task } from "@/app/models/task";
import { cookies } from "next/headers";
import { errorHandler } from "@/middleware";
import { redirect } from "next/navigation";

export async function GET(req, con){
    await connectDB();

    console.log('req ', req);

    const user = await checkAuth(req);

    console.log('mytask user ', user);

    console.log('myCookie ', cookies().get('todo'));
    if(!user) return errorHandler({}, 401, "Login first");


    const token = await cookies().get('todo')?.value;
    console.log(token);

    const tasks = await Task.find({user : user._id});
    console.log('tasks2 ', tasks);

    return NextResponse.json({
        success : true,
        tasks,
    });
};

