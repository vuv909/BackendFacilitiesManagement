import Facility from "../models/Facility.js"
import facilityRepository from "../repositories/facility.repository.js";
import {categoryService} from "../services/index.js"

const create = async (data, imageResult) => {
    try {
        const facility = data;
        if (imageResult.statusCode == 1 && imageResult.urls) {
            facility.image = imageResult.urls[0];
        } else {
            return {
                statusCode: 0,
                message: "Error when upload image"
            }
        }
        const existedFacility = await Facility.find({ name: facility?.name });
        if (existedFacility && existedFacility.length > 0) {
            return {
                statusCode: 0,
                message: "Already exsited facility"
            }
        }
        const newFacility = await Facility.create(facility);
        return {
            statusCode: 1,
            message: "Created successfully",
            data: newFacility
        }
    } catch (error) {
        return {
            statusCode: 0,
            message: "System error"
        }
    }
}
const update = async (data, imageResult) => {
    const facility = data;
    if (imageResult.statusCode == 1 && imageResult.urls) {
        facility.image = imageResult.urls[0];
    }
    try {
        const existedFacility = await Facility.findById(facility?.id);
        if (!existedFacility) {
            return {
                statusCode: 0,
                message: "Facility not existed"
            }
        }
        existedFacility.name = facility.name;
        existedFacility.description = facility.description;
        existedFacility.location = facility.location;
        existedFacility.status = facility.status;
        existedFacility.category = facility.category;
        existedFacility.image = facility.image;
        await existedFacility.save();
        return {
            statusCode: 1,
            message: "Updated successfully",
            data: existedFacility
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 0,
            message: "System error"
        }
    }
}

const remove = async (id) => {
    try {
        const facilityDelete = await Facility.findByIdAndDelete(id);
        if (!facilityDelete) {
            return {
                statusCode: 0,
                message: "Not found record"
            }
        }
        return {
            statusCode: 1,
            message: "Remove successfully",
            data: facilityDelete
        }
    } catch (error) {
        return {
            statusCode: 0,
            message: "System error"
        }
    }
}

const detail = async (id) => {
    try {
        const facility = await facilityRepository.findFacility(id);
        if (!facility) {
            return {
                statusCode: 0,
                message: "Not found record"
            }
        }
        return {
            statusCode: 1,
            message: "Get data successfully",
            data: facility
        }
    } catch (error) {
        return {
            statusCode: 0,
            message: "System error"
        }
    }
}

const listPagination = async (page, size, name, categoryId) => {
    const startIndex = (page - 1) * size;
    const category = await categoryService.findOne(categoryId);
    const query = { name: {$regex: name, $options: 'i'}};
    if(category.statusCode == 1){
        query.category = categoryId; 
    }
    console.log(query);
    try {
        const listFacility = await facilityRepository.findPagination(startIndex, size, query);
        return {
            statusCode: 1,
            message: "Get data successfully",
            items: listFacility.items,
            totalPage: Math.ceil(listFacility.total/size),
            activePage: page
        }
    } catch (error) { 
        console.log(error);
        return {
            statusCode: 0, 
            message: "System error"
        }
    }
}


export default {
    create,
    update,
    remove,
    detail,
    listPagination
}