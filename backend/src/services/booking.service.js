import Booking from '../models/Booking.js'

import bookingRepository from '../repositories/booking.repository.js'

const update = async (req) => {

    const { id } = req.params;
    try {
        // const existedbooking = await booking.find({ name: booking?.id });
        // if (!existedbooking || existedbooking.length <= 0) {
        //     return {
        //         statusCode: 0,
        //         message: "booking not existed"
        //     }
        // }
        // await existedbooking.save();
        await Booking.findByIdAndUpdate(id, req.body, { new: true }).exec();
        return {
            statusCode: 1,
            message: "Updated successfully"
        }
    } catch (error) {
        return {
            statusCode: 0,
            message: error.message
        }
    }
}

const deleteOne = async (req) => {

    const { id } = req.params;
    try {
        await Booking.deleteOne({ _id: id }).exec();
        return {
            statusCode: 1,
            message: "Delete successfully"
        }
    } catch (error) {
        return {
            statusCode: 0,
            message: error.message
        }
    }
}
const detail = async (req) => {

    const { id } = req.params;
    try {
        const result = await Booking.findById(id).exec();
        return {
            statusCode: 200,
            data: result,
        }
    } catch (error) {
        return {
            statusCode: 0,
            message: error.message
        }
    }
}

const create = async (req) => {
    try {
        console.log("Day là create ", req.body)
        // const existedbooking = await booking.find({ name: booking?.name });
        // if (existedbooking && existedbooking.length > 0) {
        //     return {
        //         statusCode: 0,
        //         message: "Already exsited booking"
        //     }
        // }
        const result = await Booking.create(req.body);
        console.log(result);
        return {
            statusCode: 1,
            message: "Created successfully"
        }
    } catch (error) {
        return {
            statusCode: 0,
            message: error.message,
        }
    }
}
const FindAll = async (req) => {
    console.log("find all");
    try {
        let user = await bookingRepository.FindAll(req);
        console.log("hello user ");
        return user;
    } catch (error) {
        return {
            message: "Error",
            content: error.toString()
        }
    }
}
export default {
    create,
    update, FindAll, deleteOne, detail
}