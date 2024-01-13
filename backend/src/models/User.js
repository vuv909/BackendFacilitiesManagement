import mongoose, { ObjectId, Schema } from "mongoose";

const User = mongoose.model("User", new Schema(
    {
        id: ObjectId,
        name: {
            type: String,
            require: true
        },
        email: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        image: {
            type: String,
            require: true,
        },
        status: {
            type: Number,
            require: true,
            default: 1,
        },
        location: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true
    }
))

export default User;