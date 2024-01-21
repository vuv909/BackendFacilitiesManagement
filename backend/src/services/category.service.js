import Category from "../models/Category.js"
import categoryRepository from "../repositories/category.repository.js";

const create = async (name) => {
    try {
        const category = await Category.find({ categoryName: name });
        if (category && category.length > 0) {
            return {
                code: 0,
                message: "Category type is already exsited"
            }
        }
        await Category.create({ categoryName: name });
        return {
            code: 1,
            message: "Success"
        }
    } catch (error) {
        return {
            code: 0,
            message: "System error!"
        }
    }
}

const list = async () => {
    try{
       const listCategory = await categoryRepository.findAll();
       return listCategory;
    }catch(error){
        return error.toString();
    }
}

const update = async (id, name) => {
    try {
        const category = await categoryRepository.findOne(id);
        category.categoryName = name;
        await category.save();
        return {
            message: "Update successfully",
            statusCode: 1
        }
    }catch(error){
        return error.toString();
    }
}

const remove = async (id) => {
    try{
        const deleteCategory = await categoryRepository.findAndDelete(id);
        return {
            message: "Remove successfully",
            statusCode: 1,
            content: deleteCategory
        }
    }catch(error) {
        return error.toString();
    }
}

export default {
    create,
    list,
    update,
    remove
}