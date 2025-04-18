import mongoose from "mongoose";

// Define Schema
const userSchema = new mongoose.Schema({
    username: { type : String, required: true, trim: true},
    email: { type : String, required: true, trim: true},
    password: { type : String, required: true, trim: true},
})

// Create Model
const userModel = mongoose.models.users || mongoose.model("User", userSchema)

export default userModel;