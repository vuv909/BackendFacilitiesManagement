import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema(
    {
        booker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        facilityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Facility",
            required: true,
        },
        handler: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        slot: {
            type: String,
            required: true,
        },
        status: {
            type: Number,
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
        modifiedBy: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
