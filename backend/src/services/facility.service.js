import { SCORE_ASC, SCORE_DESC, TOTAL_BOOKED_ASC, TOTAL_BOOKED_DESC } from "../Enum/SortFacility.js";
import Booking from "../models/Booking.js";
import Category from "../models/Category.js";
import Comment from "../models/Comment.js";
import Facility from "../models/Facility.js"
import facilityRepository from "../repositories/facility.repository.js";
import { categoryService, fileService, logService } from "../services/index.js"
import deepCopy from "../utils/index.js";

const create = async (data) => {
    try {
        const facility = data;
        const existedFacility = await Facility.find({ name: facility?.name });
        if (existedFacility && existedFacility.length > 0) {
            return {
                statusCode: 0,
                message: "Already exsited facility"
            }
        }
        const imageResult = await fileService.uploadFile(data);
        if (imageResult.statusCode == 1 && imageResult.urls) {
            facility.image = imageResult.urls[0];
        } else {
            return {
                statusCode: 0,
                message: "Error when upload image"
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
const update = async (data) => {
    const facility = data;
    try {
        const existedFacility = await Facility.findById(facility?.id);
        const objectBefore = deepCopy(existedFacility);
        if (!existedFacility) {
            return {
                statusCode: 0,
                message: "Facility not existed"
            }
        }
        const existedName = await Facility.findOne({ name: facility.name });
        if (existedName && !existedName._id.equals(existedFacility._id)) {
            return {
                statusCode: 0,
                message: "Facility name is exsited"
            }
        }
        const imageResult = await fileService.uploadFile(data);
        if (imageResult.statusCode == 1 && imageResult.urls) {
            facility.image = imageResult.urls[0];
        }
        existedFacility.name = facility.name;
        existedFacility.description = facility.description;
        existedFacility.location = facility.location;
        existedFacility.status = facility.status;
        existedFacility.category = facility.category;
        existedFacility.image = facility.image ? facility.image : existedFacility.image;
        await existedFacility.save();
        const objectAfter = deepCopy(existedFacility);
        await logService.create({ collectionName: "Facility", objectBefore, objectAfter, action: "update", id: existedFacility._id })
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
    const query = { name: { $regex: name, $options: 'i' } };
    if (category.statusCode == 1) {
        query.category = categoryId;
    }
    try {
        const listFacility = await facilityRepository.findPagination(startIndex, size, query);
        return {
            statusCode: 1,
            message: "Get data successfully",
            items: listFacility.items,
            totalPage: Math.ceil(listFacility.total / size),
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


const listDashboard = async (page, size, name, categoryId, sort) => {
    const startIndex = (page - 1) * size;
    const category = await categoryService.findOne(categoryId);
    const query = { name: { $regex: name, $options: 'i' } };
    if (category.statusCode == 1) {
        query.category = categoryId;
    }
    try {
        const listFacility = await facilityRepository.findPagination(0, 100000, query);
        const newListFacility = await Promise.all(listFacility.items.map(async (item) => {
            const planObject = item.toObject();
            const comments = await Comment.find({ facility: item._id });
            const bookings = await Booking.find({ facilityId: item._id, status: 2 });
            if (comments.length <= 0) {
                planObject.score = 0;
            } else {
                planObject.score = 0;
                const totalStar = comments.reduce((accumlator, currentObject) => {
                    currentObject.star = currentObject.star ? currentObject.star : 0;
                    return accumlator + currentObject.star;
                }, 0)
                planObject.score = totalStar / comments.length;
            }
            planObject.totalBooked = bookings.length;
            return planObject;
        }))
        switch (sort) {
            case SCORE_ASC:
                newListFacility.sort((a, b) => a.score - b.score);
                break;
            case SCORE_DESC:
                newListFacility.sort((a, b) => b.score - a.score);
                break;
            case TOTAL_BOOKED_ASC:
                newListFacility.sort((a, b) => a.totalBooked - b.totalBooked);
                break;
            case TOTAL_BOOKED_DESC:
                newListFacility.sort((a, b) => b.totalBooked - a.totalBooked);
                break;
            default:
                newListFacility.sort((a, b) => b.score - a.score);
                break;
        }
        const listFacilityPag = newListFacility.slice(startIndex, startIndex + size);
        return {
            statusCode: 1,
            message: "Get data successfully",
            items: listFacilityPag,
            totalPage: Math.ceil(listFacility.total / size),
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

const getFacilityByCategory = async () => {
    try {
        const categoryList = await Category.find();
        const promises = categoryList.map(async (category) => {
            const countFacility = await Facility.countDocuments({ category: category._id });
            return { [category.categoryName]: countFacility };
        });
        const resultArray = await Promise.all(promises);
        const newObject = Object.assign({}, ...resultArray);        
        return {
            statusCode: 1,
            data: newObject
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
    listPagination,
    listDashboard,
    getFacilityByCategory
}