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

export default {
    create,
    list
}