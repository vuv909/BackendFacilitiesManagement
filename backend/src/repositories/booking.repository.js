import mongoose from 'mongoose';
import Booking from '../models/Booking.js'
import { Types } from 'mongoose';
import { ENDDATE_SLOT1, ENDDATE_SLOT2, ENDDATE_SLOT3, ENDDATE_SLOT4, ENDDATE_SLOT5, ENDDATE_SLOT6, ENDDATE_SLOT7, ENDDATE_SLOT8, ENDDATE_SLOT9, STARTDATE_SLOT1, STARTDATE_SLOT2, STARTDATE_SLOT3, STARTDATE_SLOT4, STARTDATE_SLOT5, STARTDATE_SLOT6, STARTDATE_SLOT7, STARTDATE_SLOT8, STARTDATE_SLOT9 } from '../Enum/DateTimeSlot.js';
import User from '../models/User.js';
import Facility from '../models/Facility.js';
import { notificationService } from '../services/index.js';
import Notification from '../models/Notification.js';

const FindAll = async (req) => {

    const userProjecttion = {
        createdAt: 0,
        updatedAt: 0,
        id: 0
    }
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5;
    const startIndex = (page - 1) * size;
    let { weeks } = req.query
    let { status } = req.query;
    let query = {};
    if (weeks) {
        query = { weeks: { $regex: weeks, $options: 'i' }, status: 2 }
    }

    if (status) {
        query = { ...query, status: status };
    }

    const existedUser = await Booking.find(query, userProjecttion)
        .populate({ path: 'booker', select: userProjecttion })
        .populate({ path: 'facilityId', select: userProjecttion })
        .populate({ path: 'handler', select: userProjecttion }).skip(startIndex).limit(size)
        .exec();
    let arrangeSeven = existedUser;
    if (weeks) {
        arrangeSeven = {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
        }
        // Chuyển đổi các đối tượng Mongoose thành đối tượng JavaScript thuần túy
        // console.log(existedUser);
        for (const day of existedUser) {
            let nameDay = day?.startDate?.toLocaleDateString("en-US", { weekday: "long" });
            // let bookingObject = day.toObject();
            // if (bookingObject.status == 1) {
            //     bookingObject.status = 'Pending';
            // } else if (bookingObject.status == 2) {
            //     bookingObject.status = 'Accept';
            // } else if (bookingObject.status == 3) {
            //     bookingObject.status = 'Reject';
            // } else if (bookingObject.status == 4) {
            //     bookingObject.status = 'Expire';
            // }
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
    }
    let total = await Booking.countDocuments();
    return {
        booking: arrangeSeven, totalPage: Math.ceil(total / size),
        activePage: page
    };

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
    const { id } = req.params;
    let { weeks } = req.query
    let query = {};
    if (weeks) {
        query = { weeks: { $regex: weeks, $options: 'i' } }
    }
    let today = new Date();
    // console.log(id);
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
    const sevenDay = await Booking.find({ $and: [{ startDate: { $gte: today, $lte: oneWeekFromToday } }, query, { facilityId: id }] }, userProjecttion).populate({ path: 'booker', select: userProjecttion }).populate({ path: 'facilityId', select: userProjecttion }).populate({ path: 'handler', select: userProjecttion }).exec();
    for (const day of sevenDay) {
        let nameDay = day?.startDate?.toLocaleDateString("en-US", { weekday: "long" });
        // let day = day.toObject();

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
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5;
    // const { weeks } = req.query
    const startIndex = (page - 1) * size;
    const existedUser = await Booking.findById(id, userProjecttion).populate({ path: 'booker', select: userProjecttion }).populate({ path: 'facilityId', select: userProjecttion }).populate({ path: 'handler', select: userProjecttion }).exec();
    return existedUser;
}
const FindBoookingUser = async (req) => {
    const userProjecttion = {
        createdAt: 0,
        updatedAt: 0,
        id: 0
    }
    const { id } = req.params;

    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5;
    // const { weeks } = req.query
    const startIndex = (page - 1) * size;
    // const query = { weeks: { $regex: weeks, $options: 'i' } };
    const { ObjectId } = Types;
    const existedUser = await Booking.find({
    }, userProjecttion).populate([{ path: 'booker', select: userProjecttion }, { path: 'facilityId', select: userProjecttion }, { path: 'handler', select: userProjecttion }]).exec();
    let arrUser = [];
    for (const item of existedUser) {
        if (item.booker?._id.equals(new ObjectId(id))) {
            arrUser.push(item)
        }
    }
    // Phân trang
    const paginatedArrUser = arrUser.slice(startIndex, startIndex + size);

    // Tạo object chứa thông tin phân trang
    const paginationInfo = {
        currentPage: page,
        totalPages: Math.ceil(arrUser.length / size),
        totalItems: arrUser.length,
        pageSize: size
    };
    let total = arrUser.length;
    return {
        booking: paginatedArrUser, totalPage: Math.ceil(total / size),
        activePage: page
    };
}
const UpdateOne = async (req) => {
    let booking = await FindBooking(req);
    if (!booking) {
        return null;
    }
    const { id } = req.params;
    const existedUser = await Booking.findByIdAndUpdate(id, req.body, { new: true }).exec();
    const message = req.body.status === 2 ? "Yêu cầu của bạn đã được phê duyệt" : "Yêu cầu của bạn đã bị từ chối";
    const notification = {
        userId: existedUser.booker,
        content: message,
        path: '/historyBooking'
    }
    await notificationService.createNotification(notification);
    return existedUser;
}
const DeleteOne = async (req) => {
    let booking = await FindBooking(req);
    if (!booking) {
        return null;
    }
    const { id } = req.params;
    const existedUser = await Booking.deleteOne({ _id: id }).exec();
    return existedUser;
}
const CreateOne = async (req) => {
    const { booker, facilityId, weeks, weekdays, slot, status, startDate, endDate } = req.body;
    const checkSameBooking = await checkBooking({
        booker: booker,
        facilityId: facilityId,
        weeks: weeks,
        weekdays: weekdays,
        slot: slot,
        status: status
    });
    let dateSlot = {};
    let startDate2 = '';
    let endDate2 = '';
    if (checkSameBooking === 'found') {
        return checkSameBooking;
    }
    if (slot == 'Slot1') {
        startDate2 = STARTDATE_SLOT1;
        endDate2 = ENDDATE_SLOT1;
    }
    else if (slot == 'Slot2') {
        startDate2 = STARTDATE_SLOT2;
        endDate2 = ENDDATE_SLOT2;
    }
    else if (slot == 'Slot3') {
        startDate2 = STARTDATE_SLOT3;
        endDate2 = ENDDATE_SLOT3;
    }
    else if (slot == 'Slot4') {
        startDate2 = STARTDATE_SLOT4;
        endDate2 = ENDDATE_SLOT4;
    }
    else if (slot == 'Slot5') {
        startDate2 = STARTDATE_SLOT5;
        endDate2 = ENDDATE_SLOT5;
    }
    else if (slot == 'Slot6') {
        startDate2 = STARTDATE_SLOT6;
        endDate2 = ENDDATE_SLOT6;
    }
    else if (slot == 'Slot7') {
        startDate2 = STARTDATE_SLOT7;
        endDate2 = ENDDATE_SLOT7;
    }
    else if (slot == 'Slot8') {
        startDate2 = STARTDATE_SLOT8;
        endDate2 = ENDDATE_SLOT8;
    }
    else if (slot == 'Slot9') {
        startDate2 = STARTDATE_SLOT9;
        endDate2 = ENDDATE_SLOT9;
    }

    // const today = new Date();

    // // Định dạng ngày hôm nay dưới dạng YYYY-MM-DD
    // const formattedDate = today.toISOString().split('T')[0];

    // // Ghép chuỗi thời gian với ngày hôm nay
    const startTimeString = startDate + startDate2;
    const endTimeString = endDate + endDate2;
    // console.log(startTimeString);
    let start = new Date(startTimeString);
    let end = new Date(endTimeString);
    // console.log(start);
    // console.log(end);

    dateSlot = {
        startDate: start,
        endDate: end
    }
    const existedUser = await Booking.create({ ...req.body, ...dateSlot });
    const user = await User.findById(booker);
    const facility = await Facility.findById(facilityId);
    const notification = {
        userId: booker,
        content: `${user.name} đã đặt phòng: ${facility.name}`,
        path: '/dashboard'
    }
    await notificationService.sendNotificationToAdmin(notification);
    return existedUser;
}

async function checkBooking(query) {
    try {
        const booking = await Booking.findOne(query);
        if (booking) {
            return "found";
        }
    } catch (error) {
        console.error("Error checking booking:", error);
    }
}

export default {
    FindAll, FindBooking, UpdateOne, DeleteOne, CreateOne, StatusBooking, FindBoookingUser
}






