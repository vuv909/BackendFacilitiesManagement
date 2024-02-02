import Booking from '../models/Booking.js'

const FindAll = async (req) => {
    const userProjecttion = {
        createdAt: 0,
        updatedAt: 0,
        id: 0
    }
    const existedUser = await Booking.find({}, userProjecttion).populate({ path: 'booker', select: userProjecttion }).populate({ path: 'facilityId', select: userProjecttion }).populate({ path: 'handler', select: userProjecttion }).exec();
    return existedUser;
}
const FindBooking = async (req) => {
    const userProjecttion = {
        createdAt: 0,
        updatedAt: 0,
        id: 0
    }
    const { id } = req.params;
    const existedUser = await Booking.findById(id, userProjecttion).populate({ path: 'booker', select: userProjecttion }).populate({ path: 'facilityId', select: userProjecttion }).populate({ path: 'handler', select: userProjecttion }).exec();
    return existedUser;
}
const UpdateOne = async (req) => {

    const { id } = req.params;
    console.log("id = " + id);
    console.log(req.body);
    const existedUser = await Booking.findByIdAndUpdate(id, req.body, { new: true }).exec();
    return existedUser;
}
const DeleteOne = async (req) => {

    const { id } = req.params;
    const existedUser = await Booking.deleteOne({ _id: id }).exec();
    return existedUser;
}
const CreateOne = async (req) => {
    const existedUser = await Booking.create(req.body);
    return existedUser;
}

export default {
    FindAll, FindBooking, UpdateOne, DeleteOne, CreateOne
}