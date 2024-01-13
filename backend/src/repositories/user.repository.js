import User from "../models/User.js"


const checkUserInDB = async (user) => {
    const existedUser = User.find({email: user.email});
    if(!existedUser){
        User.create(user);
    }
    return existedUser;
}

export default {
    checkUserInDB
}