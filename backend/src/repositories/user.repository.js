import User from "../models/User.js"

const checkUserInDB = async (user) => {
    const existedUser = await User.findOne({ email: user.email });
    if (!existedUser) {
        const newUser = await User.create({
            email: user.email,
            name: user.name,
            avatara: user.picture
        });
        return newUser;
    }
    return existedUser;
}
const findUser = async (id) => {
    const existedUser = User.findById(id).exec();;

    return existedUser;
}
const UpdateOne = async (req) => {
    const { id } = req.params;
    const existedUser = await User.findByIdAndUpdate(id, req.body, { new: true }).exec();
    return existedUser;
}
const FindAll = async (req) => {
    const existedUser = await User.find({}).exec();
    return existedUser;
}

export default {
    checkUserInDB, findUser, UpdateOne, FindAll
}