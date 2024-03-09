import Booking from '../models/Booking.js'

import bookingRepository from '../repositories/booking.repository.js'

const update = async (req) => {

    try {
        const result = await bookingRepository.UpdateOne(req);
        if (result == null) {
            return {
                statusCode: 400,
                message: "Not found Id "
            }
        }
        return {
            statusCode: 200,
            result: result,
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


    try {
        const result = await bookingRepository.DeleteOne(req);
        if (result == null) {
            return {
                statusCode: 400,
                message: "Not found Id "
            }
        }
        return {
            statusCode: 1,
            result: result,
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

    try {
        const result = await bookingRepository.FindBooking(req);
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
        const result = await bookingRepository.CreateOne(req);
        if (result === "found") {
            return {
                statusCode: 400,
                message: "You already have a booking"
            }
        }
        return {
            statusCode: 201,
            result: result,
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

    try {
        let user = await bookingRepository.FindAll(req);

        return user;
    } catch (error) {
        return {
            message: "Error",
            content: error.toString()
        }
    }
}
const statusBooking = async (req) => {
    console.log("statusBooking");
    try {
        let user = await bookingRepository.StatusBooking(req);
        console.log("hello user ");
        return user;
    } catch (error) {
        return {
            message: "Error",
            content: error.toString()
        }
    }
}
const FindBoookinUser = async (req) => {
    console.log("statusBooking");
    try {
        let user = await bookingRepository.FindBoookingUser(req);
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
    update, FindAll, deleteOne, detail, statusBooking, FindBoookinUser
}