import bcrypt from 'bcryptjs';
import { connectDB } from '../../../server/db/connectDB';
import User from '../../../server/models/userModel';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '@/app/utils/helper';

// export default async function POST(req: Request, res: NextApiResponse) {
//   if (req.method !== 'POST') return ApiResponse(405, { message : "Server Error"} )

//   await connectDB();
//   const { username, email, password } = await req.json();

//   const existingUser = await User.findOne({ email });
//   if (existingUser) return ApiResponse(505, { message : "Server Error"} )

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User({ username, email, password: hashedPassword });
//   await newUser.save();
 
//   return ApiResponse(201, { message: 'User registered successfully'} )
// }

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  const dbConnection =  await connectDB()

  if(!dbConnection) {
    return ApiResponse(500,{ type: "error", message: "Failed to connect server"})
  }

  const user = await User.findOne({ email: email });
  if (user) {
    return ApiResponse(400,{ type: "error", message: "Email already exist"})
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const doc = new User({
        username: username,
        email: email,
        password: hashPassword,
      });

      await doc.save();
      return ApiResponse(201, { message: 'User registered successfully'} )
    } catch (error) {
      console.log(error);
    }
  }
}
