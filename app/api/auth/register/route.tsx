import bcrypt from 'bcryptjs';
import { connectDB } from '../../../server/db/connectDB';
import User from '../../../server/models/userModel';
import { ApiResponse } from '@/app/utils/helper';

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
