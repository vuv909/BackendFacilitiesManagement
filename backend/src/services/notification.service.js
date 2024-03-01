import Notification from "../models/Notification.js"

const createNotification = async (notification) => {
    try {
        const notification = await Notification.create(notification);
        return {
            statusCode: 1,
            content: notification
        }
    } catch (error) {
        return {
            statusCode: 0,
            error
        }
    }
}

const getNotificationByUserId = async ({userId, page, size}) => {
    const startIndex = (page - 1) * size;
    try {
        const list = await Notification.find({ userId }).skip(startIndex).size(size);
        return {
            statusCode: 1,
            content: list
        }
    } catch (error) {
        return {
            statusCode: 0,
            error
        }
    }
}

export default {
    createNotification,
    getNotificationByUserId
}