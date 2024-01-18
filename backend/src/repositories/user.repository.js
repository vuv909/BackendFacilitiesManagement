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
    console.log("find byd id");
    const existedUser = User.findById(id).exec();;

    return existedUser;
}
const UpdateOne = async (req) => {
    const { id } = req.params;
    const existedUser = User.updateOne(req.body, { _id: id });
    return existedUser;
}
const FindAll = async (req) => {
    console.log("hello ");
    const existedUser = await User.find({}).exec();
    console.log(existedUser);
    return existedUser;
}

export default {
    checkUserInDB, findUser, UpdateOne, FindAll
}