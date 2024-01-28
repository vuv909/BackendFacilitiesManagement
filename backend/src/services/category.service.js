import Category from "../models/Category.js"
import categoryRepository from "../repositories/category.repository.js";

const create = async (name) => {
    try {
        const category = await Category.find({ categoryName: name });
        if (category && category.length > 0) {
            return {
                statusCode: 0,
                message: "Category type is already exsited"
            }
        }
        await Category.create({ categoryName: name });
        return {
            statusCode: 1,
            message: "Success"
        }
    } catch (error) {
        return {
            statusCode: 0,
            message: "System error!"
        }
    }
}

const list = async (page, size, name) => {
    const startIndex = (page - 1) * size;
    const query = {
		categoryName: { $regex: name, $options: 'i' }
	};
    console.log(query);
    try{
       const listCategory = await categoryRepository.findPagination(startIndex, size, query);
       console.log(listCategory);
       return {
            statusCode: 1,
            message: "Success",
            data: listCategory
       };
    }catch(error){
        return {
            statusCode: 0,
            message: "System error!"
        }
    }
}

const update = async (id, name) => {
    try {
        const category = await categoryRepository.findOne({id});
        console.log("category", category);
        category.categoryName = name;
        await category.save();
        return {
            message: "Update successfully",
            statusCode: 1
        }
    }catch(error){
        return {
            statusCode: 0,
            message: "System error!"
        }
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
        return {
            statusCode: 0,
            message: "System error!"
        }
    }
}

export default {
    create,
    list,
    update,
    remove
}