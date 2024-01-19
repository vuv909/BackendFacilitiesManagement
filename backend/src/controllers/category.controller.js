import categoryService from "../services/category.service.js";

const create = async (req, res) => {
    const { categoryName } = req.body;
    try {
        const result = await categoryService.create(categoryName);
        return res.status(201).json(result);
    }catch(error){
        return res.status(500).json({ message: "System error" })
    }
}

const list = async (req, res) => {
    try{
        const result = await categoryService.list();
        return res.status(200).json(result);
    }catch(error) {
        return res.status(500).json({message: "System error"});
    }
}

export default {
    create,
    list
}