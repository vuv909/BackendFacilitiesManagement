import User from "../models/User.js"

const checkUserInDB = async (user) => {
    const existedUser = await User.findOne({ email: user.email }).exec();
    console.log("abc", existedUser);
    if (!existedUser) {
        const newUser = await User.create({
            email: user.email,
            name: user.name,
            avatar: user.picture,
            status: 1
        });
        return newUser;
    }
    return existedUser;
}
const findUser = async (id) => {
    try {
        const userProjecttion = {
            createdAt: 0,
            updatedAt: 0,
            id: 0
        }
        const existedUser = await User.findById(id, userProjecttion).populate({ path: "roleId", select: userProjecttion }).exec();
        return existedUser;
    } catch (error) {
        console.error("Error finding user:", error);
        throw error;
    }
}
const UpdateOne = async (req) => {
    const { id } = req.params;
    const existedUser = await User.findByIdAndUpdate(id, req.body, { new: true }).exec();
    return existedUser;
}
const FindAll = async (req) => {
    const userProjecttion = {
        createdAt: 0,
        updatedAt: 0,
        id: 0
    }
    const existedUser = await User.find({}, userProjecttion).populate({ path: "roleId", select: userProjecttion }).exec();
    return existedUser;
}

export default {
    checkUserInDB, findUser, UpdateOne, FindAll
}