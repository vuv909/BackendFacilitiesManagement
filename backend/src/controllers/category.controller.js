import categoryService from "../services/category.service.js";

const create = async (req, res) => {
    const { name } = req.body;
    try {
        // const result = await categoryService.create(name);
        return res.status(201).json(result);
    }catch(error){
        return res.status(500).json({ message: "System error" })
    }
}

export default {
    create
}