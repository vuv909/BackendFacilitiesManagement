import mongoose, { ObjectId, Schema } from "mongoose";

const Notification = mongoose.model("Notification", new Schema(
    {
        id: ObjectId,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        },
        content: {
            type: Number,
            required: true
        },
        path: {
            type: String,
        }
    },
    {
        timestamps: true
    }
))

export default Notification;