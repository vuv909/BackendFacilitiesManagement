import Role from "../models/Role.js"


const findRole = async (id) => {
    try {
        const existedRole = await Role.findById(id).exec();
        return existedRole;
    } catch (error) {
        console.error("Error finding role:", error);
        throw error;
    }
}
const UpdateOne = async (req) => {
    const { id } = req.params;
    const existedRole = await Role.findByIdAndUpdate(id, req.body, { new: true }).exec();
    return existedRole;
}
const FindAll = async (req) => {
    const existedRole = await Role.find({}).exec();
    return existedRole;
}

const create = async (roleName) => {
    const newRole = await Role.create({roleName, status: 1});
    return newRole;
}

const findRoleByName = async (roleName) => {
    const role = await Role.findOne({roleName});
    return role;
}

export default {
    findRole, UpdateOne, FindAll, create, findRoleByName
}