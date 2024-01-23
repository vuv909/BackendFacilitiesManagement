import mongoose, { ObjectId, Schema } from "mongoose";

const Booking = mongoose.model("Booking", new Schema(
    {
        id: ObjectId,
        booker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        facilityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        handler: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        startDate: {
            type: Date,
            require: true
        },
        endDate: {
            type: Date,
            require: true
        },
        slot: {
            type: String,
            require: true
        },
        status: {
            type: Number,
            require: true
        },
        createdBy: {
            type: String,
        },
        modifiedBy: {
            type: String,
        },
    },
    {
        timestamps: true
    }
))

export default Booking;