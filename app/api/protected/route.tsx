import { ApiResponse } from "@/app/utils/helper";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";



export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const session  =  await getServerSession(authOptions)

    if(session) {
        return ApiResponse(200, {
            message : "This is protected content. You can access this content because you are signed in.",
        })
    } else {
        return ApiResponse(200, {
            error: "You must be signed in to view the protected content on this page.",
        })
    }
    
}