import Notification from "../models/Notification.js"
import roleService from "./role.service.js";
import userService from "./user.service.js";

const createNotification = async (notification) => {
    try {
        const newNotification = await Notification.create(notification);
        return {
            statusCode: 1,
            content: newNotification
        }
    } catch (error) {
        return {
            statusCode: 0,
            error
        }
    }
}

const getNotificationByUserId = async ({ userId, page, size }) => {
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

const sendNotificationToAdmin = async (notification) => {
    try {
        const adminRole = await roleService.findRoleByName("Admin");
        if (adminRole.statusCode === 1) {
            const listUser = await userService.findCondition({ roleId: adminRole.content._id });
            listUser.data.forEach(async (user) => {
                notification.userId = user._id;
                console.log(notification);
                const newNotification = await Notification.create(notification);
                console.log(newNotification);
            })
        } else {
            return {
                statusCode: 0,
                message: "Role Admin is not existed."
            }
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
    getNotificationByUserId,
    sendNotificationToAdmin
}