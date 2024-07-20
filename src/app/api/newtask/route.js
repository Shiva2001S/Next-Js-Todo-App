import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {handler} from '../../utils/features'

export async function POST(req, con){
    if(req.method !== "POST"){
        return errorHandler(res, 400, "only post method is allowed");
    }
    
    const body = await req.json();
    console.log(body);
    await handler(body);
   
    // Shiva2001

    return NextResponse.json({
        success : true,
        message : 'Task created',
    });
};

