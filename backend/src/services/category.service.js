import Category from "../models/Category.js"

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

export default {
    create
}