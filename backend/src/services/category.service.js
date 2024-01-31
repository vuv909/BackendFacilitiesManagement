import Category from "../models/Category.js"
import categoryRepository from "../repositories/category.repository.js";

const create = async (data) => {
    try {
        const category = data.body;
        if (data.urls) {
            category.image = data.urls[0];
        }
        const exsitedCategory = await Category.find({ categoryName: category.categoryName });
        if (exsitedCategory && exsitedCategory.length > 0) {
            return {
                statusCode: 0,
                message: "Category type is already exsited"
            }
        }
        const newCategory = await Category.create(category);
        return {
            statusCode: 1,
            message: "Success",
            data: newCategory
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

const update = async (data) => {
    try {
        const category = data.body;
        if (data.urls) {
            category.image = data.urls[0];
        }
        const categoryUpdate = await categoryRepository.findOne({_id: category.id});
        categoryUpdate.categoryName = category.categoryName;
        categoryUpdate.image = category.image;
        await categoryUpdate.save();
        return {
            message: "Update successfully",
            statusCode: 1,
            data: categoryUpdate
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