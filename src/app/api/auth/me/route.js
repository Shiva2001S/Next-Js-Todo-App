import { checkAuth } from "../../../utils/features";
import { NextResponse } from "next/server";

export async function GET(req) {
    const user = await checkAuth(req);

    return NextResponse.json({
        success : true,
        user,
    })
}