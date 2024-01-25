import Facility from "../models/Facility.js";

const findAll = async () => {
    const listFacility = await Facility.find({}).exec();
    return listFacility;
}

export default {
    findAll
}