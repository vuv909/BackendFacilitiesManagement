import Booking from '../models/Booking.js'

const FindAll = async (req) => {
    console.log("find all");
    const existedUser = await Booking.find({}).exec();
    return existedUser;
}

export default {
    FindAll
}