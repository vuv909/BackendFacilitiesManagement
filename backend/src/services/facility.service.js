import Facility from "../models/Facility.js"

const update = async (facility) => {
    try {
        const existedFacility = await Facility.find({ name: facility?.id });
        if (!existedFacility || existedFacility.length <= 0) {
            return {
                statusCode: 0,
                message: "Facility not existed"
            }
        }
        await existedFacility.save();
        return {
            statusCode: 1,
            message: "Updated successfully"
        }
    } catch (error) {
        return {
            statusCode: 0,
            message: "System error"
        }
    }
}

const create = async (facility) => {
    try {
        const existedFacility = await Facility.find({ name: facility?.name });
        if (existedFacility && existedFacility.length > 0) {
            return {
                statusCode: 0,
                message: "Already exsited facility"
            }
        }
        await Facility.create(facility);
        return {
            statusCode: 1,
            message: "Created successfully"
        }
    } catch (error) {
        return {
            statusCode: 0,
            message: "System error"
        }
    }
}

export default {
    create,
    update
}