import { Task } from "@/app/models/task";
import { checkAuth, connectDB } from "@/app/utils/features";
import { NextResponse } from "next/server";

export async function PUT(req, con) {
    await connectDB();
    const user = await checkAuth(req);

    console.log(con);
    const taskId = con.params.id;

    const task = await Task.findById(taskId);

    task.isCompleted = !task.isCompleted;

    await task.save();
    
    return NextResponse.json({
        success : true,
        message : 'Task Updated successfully',
    })
}

export async function DELETE(req, con) {
    await connectDB();
    const user = await checkAuth(req);
    
    console.log(con);
    const taskId = con.params.id;
    
    const task = await Task.findById(taskId);
    
    await task.deleteOne();
    
    return NextResponse.json({
        success : true,
        message : 'Task Deleted successfully',
    })
}