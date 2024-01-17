import mongoose, { ObjectId, Schema } from "mongoose";

const User = mongoose.model("User", new Schema(
    {
        id: ObjectId,
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
        },
        avatar: {
            type: String,
            require: true,
        },
        status: {
            type: Number,
            require: true,
            default: 1,
        },
        address: {
            type: String, 
            require: false
        }
    },
    {
        timestamps: true
    }
))

export default User;