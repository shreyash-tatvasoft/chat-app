import { connectDB } from "@/app/server/db/connectDB";
import userModel from "@/app/server/models/userModel";
import { ApiResponse,  getIDFromToken} from "@/app/utils/helper";

export async function GET (req : Request) {
    const dbConnection = await connectDB()

    if (!dbConnection) {
      return ApiResponse(500, {
        type: "error",
        message: "Failed to connect server",
      });
    }

    try {
         const token = req.headers.get("token");

         if(!token) {
            return ApiResponse(404,{ type: "error", message: "Invalid User Details"})
        }

        const user_id = getIDFromToken(token)

        const allUsers = await userModel.find({ _id : { $ne : user_id}}).select("-password")

        if(allUsers && allUsers.length > 0) {
            return ApiResponse(200, { type: "success", data: allUsers });
        } else {
            return ApiResponse(404, { type: "error", data: [] });
        }

    } catch (error) {
        console.log("first", error)
    }
}