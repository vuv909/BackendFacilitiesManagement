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

const create = async (data) => {
    try {
        const facility = data.body;
        if(data.urls){
            facility.image = data.urls[0];
        }
        const existedFacility = await Facility.find({ name: facility?.name });
        if (existedFacility && existedFacility.length > 0) {
            throw new Error("Already exsited facility");
        }
        await Facility.create(facility);
        return {
            statusCode: 1,
            message: "Created successfully"
        }
    } catch (error) {
        return error.toString();
    }
}

export default {
    create,
    update
}