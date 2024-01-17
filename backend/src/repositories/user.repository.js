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

export default {
    checkUserInDB
}