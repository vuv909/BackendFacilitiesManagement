import Facility from "../models/Facility.js";

const findAll = async () => {
    const listFacility = await Facility.find({}).exec();
    return listFacility;
}

const findOne = async (object) => {
    const facility = await Facility.findOne(object).exec();
    return facility;
}

const findFacility = async (id) => {
    const facility = await Facility.findById(id).exec()
    return facility;
}

const findPagination = async (startIndex, size, query) => {
    try {
        const listFacility = await Facility.find(query).skip(startIndex).limit(size).exec();
        const total = await Facility.countDocuments(query).exec();
        return {
            items: listFacility,
            total: total
        };
    } catch (error) {
        console.error(error);
        throw new Error('Error occurred while finding facilities.');
    }
}

export default {
    findAll,
    findOne,
    findPagination,
    findFacility
}