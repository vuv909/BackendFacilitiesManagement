import Category from "../models/Category.js"
import categoryRepository from "../repositories/category.repository.js";

const create = async (data, imageResult) => {
    try {
        const category = data;
        if (imageResult.statusCode == 1 && imageResult.urls) {
            category.image = imageResult.urls[0];
        }else {
            return {
                statusCode: 0,
                message: "Error when upload image"
            }
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
    try{
       const listCategory = await categoryRepository.findPagination(startIndex, size, query);
       return {
            statusCode: 1,
            message: "Success",
            item: listCategory.items,
            totalPage: Math.ceil(listCategory.total/size),
            activePage: page
       };
    }catch(error){
        return {
            statusCode: 0,
            message: "System error!"
        }
    }
}

const update = async (data, imageResult) => {
    try {
        const category = data;
        if (imageResult.statusCode == 1 && imageResult.urls) {
            category.image = imageResult.urls[0];
        }else {
            return {
                statusCode: 0,
                message: "Error when upload image"
            }
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