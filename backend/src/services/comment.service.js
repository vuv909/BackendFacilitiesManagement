import Booking from "../models/Booking.js";
import Comment from "../models/Comment.js";
import commentRepository from "../repositories/comment.repository.js";

const create = async (comment, userId) => {
    try {
        const resultCheckPermission = await checkCommentPermisson({facilityId: comment.facility, userId});
        if(resultCheckPermission.statusCode === 0){
            return {
                statusCode: 0,
                message: "You only can comment after using facility."
            }
        }
        const existedComment = await Comment.findOne({ booking: comment.booking });
        if (existedComment) {
            return {
                statusCode: 0,
                message: "You are already commented facility for this booking."
            }
        }
        comment.userId = userId;
        comment.createdBy = userId;
        const newComment = await Comment.create(comment);
        newComment.populate([
            { path: 'userId' },
            { path: "booking" },
            { path: "facility" }
        ]);
        return {
            statusCode: 1,
            data: newComment
        }
    } catch (error) {
        return {
            statusCode: 0,
            message: error.toString()
        }
    }
}

const checkCommentPermisson = async ({ facilityId, userId }) => {
    try {
        console.log(facilityId, userId);
        const currentDate = new Date();
        const checkBooking = await Booking.findOne({ facilityId, booker: userId, status: 2, startDate: { $lte: currentDate } });
        if (!checkBooking) {
            return {
                statusCode: 0,
                message: "You only can comment after using facility.",
                data: false
            }
        }
        return {
            statusCode: 1,
            data: true
        }
    } catch (error) {
        return {
            statusCode: 0,
            message: error.toString()
        }
    }
}

const edit = async (comment) => {
    try {
        const existedComment = await Comment.findById(comment.id);
        if (!existedComment) {
            return {
                statusCode: 0,
                message: "Comment is not existed!"
            }
        }
        existedComment.content = comment.content;
        await existedComment.save();
        return {
            statusCode: 1,
            data: existedComment
        }
    } catch (error) {
        return {
            statusCode: 0,
            message: error.toString()
        }
    }
}

const getCommentsByFacilityId = async (facilityId, page, size) => {
    try{
        const startIndex = (page - 1) * size;
        console.log(page, size, startIndex);
        const comments = await commentRepository.findPagination({facility: facilityId, startIndex, size});
        return {
            statusCode: 1,
            message: "Get data successfully",
            items: comments.items,
            totalPage: Math.ceil(comments.total/size),
            activePage: page
        }
    }catch(error){
        return {
            statusCode: 0,
            message: error.toString()
        }
    }
}

export default {
    create, checkCommentPermisson, edit, getCommentsByFacilityId
}