import mongoose from 'mongoose';
import Booking from '../models/Booking.js'
import { Types } from 'mongoose';



const FindAll = async (req) => {
    const userProjecttion = {
        createdAt: 0,
        updatedAt: 0,
        id: 0
    }
    const existedUser = await Booking.find({}, userProjecttion)
        .populate({ path: 'booker', select: userProjecttion })
        .populate({ path: 'facilityId', select: userProjecttion })
        .populate({ path: 'handler', select: userProjecttion })
        .exec();

    // Chuyển đổi các đối tượng Mongoose thành đối tượng JavaScript thuần túy
    const updatedExistedUser = existedUser.map(booking => {
        let bookingObject = booking.toObject();
        if (bookingObject.status == 1) {
            bookingObject.status = 'Pending';
        } else if (bookingObject.status == 2) {
            bookingObject.status = 'Accept';
        } else if (bookingObject.status == 3) {
            bookingObject.status = 'Reject';
        } else if (bookingObject.status == 4) {
            bookingObject.status = 'Success';
        }
        console.log(bookingObject);
        return bookingObject;
    });

    return updatedExistedUser;
}
/*
- lấy mảng 7 ngày; ở mỗi ngày sẽ có mảng 9 slot,  
*/
const StatusBooking = async (req) => {
    const userProjecttion = {
        createdAt: 0,
        updatedAt: 0,
        id: 0
    }
    // làm thế nào để kiểm tra thứ 2 có những người nào đăt được rồi: dựa vào status
    // dựa vào thời gian: 
    // thời gian bắt đầu và thời gian tạo 
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let oneWeekFromToday = new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000);
    oneWeekFromToday.setHours(0, 0, 0, 0)
    // giải pháp
    // lấy ra 7 ngày kể từ ngày hôm nay bằng điều kiện trong mongoose
    // tạo mảng rỗng: chứa mảng của monday, tú....
    // sau đó: lặp từng ngày một

    // nếu ngày hôm đấy là thứ 2 thì tống cổ vào mảng của thứ 2
    // thứ 3 thì tổng cổ vào thứ 3
    // (nếu muốn rõ từng slot): thì so sánh nếu thứ đấy, vào trong if (slot 1 hay 2...) thì tống cổ vào đấy là được 

    let arrangeSeven = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
    }
    const sevenDay = await Booking.find({ startDate: { $gte: today, $lte: oneWeekFromToday }, status: 2 }, userProjecttion).populate({ path: 'booker', select: userProjecttion }).populate({ path: 'facilityId', select: userProjecttion }).populate({ path: 'handler', select: userProjecttion }).exec();
    console.log(sevenDay);
    for (const day of sevenDay) {
        let nameDay = day.startDate.toLocaleDateString("en-US", { weekday: "long" });
        if (nameDay === 'Monday') {
            arrangeSeven.Monday.push(day);
        }
        else if (nameDay === 'Tuesday') {
            arrangeSeven.Tuesday.push(day);
        }
        else if (nameDay === 'Wednesday') {
            arrangeSeven.Wednesday.push(day);
        }
        else if (nameDay === 'Thursday') {
            arrangeSeven.Thursday.push(day);
        }
        else if (nameDay === 'Friday') {
            arrangeSeven.Friday.push(day);
        }
        else if (nameDay === 'Saturday') {
            arrangeSeven.Saturday.push(day);
        }
        else if (nameDay === 'Sunday') {
            arrangeSeven.Sunday.push(day);
        }

    }
    // console.log(arrangeSeven);
    return arrangeSeven;
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
const FindBoookinUser = async (req) => {
    const userProjecttion = {
        createdAt: 0,
        updatedAt: 0,
        id: 0
    }
    const { id } = req.params;
    const { ObjectId } = Types;
    const existedUser = await Booking.find({
    }, userProjecttion).populate([{ path: 'booker', select: userProjecttion }, { path: 'facilityId', select: userProjecttion }, { path: 'handler', select: userProjecttion }]).exec();
    let arrUser = [];
    for (const item of existedUser) {
        if (item.booker?._id.equals(new ObjectId(id))) {
            arrUser.push(item)
        }
    }
    // existedUser.e;
    return arrUser;
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
    FindAll, FindBooking, UpdateOne, DeleteOne, CreateOne, StatusBooking, FindBoookinUser
}