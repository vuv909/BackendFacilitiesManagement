import Category from "../models/Category.js";

const findAll = async () => {
    const listCategory = await Category.find().exec();
    return listCategory;
}

const findOne = async(id) => {
    const category = await Category.findOne({id}).exec();
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

export default { 
    findAll,
    findOne,
    findByCondition,
    findAndDelete
}