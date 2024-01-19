import Category from "../models/Category.js";

const findAll = async () => {
    const listCategory = await Category.find().exec();
    return listCategory;
}

export default { findAll }