import Category from "../models/Category.js";

const findAll = async () => {
    const listCategory = await Category.find().exec();
    return listCategory;
}

const findOne = async(object) => {
    const category = await Category.findOne(object).exec();
    return category;
}

const findByCondition = async (conditionObject) => {
    const listCategory = await Category.find(conditionObject).exec();
    return listCategory;
}

const findAndDelete = async (id) => {
    try{
        const category = await Category.findByIdAndDelete(id).exec();
        return category;
    }catch(error){
        return error.toString();
    }
}

const findPagination = async (startIndex, size, query) => {
    const listCategory = await Category.find(query).skip(startIndex).limit(size);
    const totalPage = await Category.countDocuments();
    return {
        items: listCategory,
        total: totalPage
    };
}

export default { 
    findAll,
    findOne,
    findByCondition,
    findAndDelete,
    findPagination
}