import categoryService from "../services/category.service.js";

const create = async (req, res) => {
    const { categoryName } = req.body;
    try {
        const result = await categoryService.create(categoryName);
        return res.status(201).json(result);
    }catch(error){
        return res.status(500).json(error)
    }
}

const list = async (req, res) => {
    try{
        const result = await categoryService.list();
        return res.status(200).json(result);
    }catch(error) {
        return res.status(500).json(error);
    }
}

const update = async (req, res) => {
    try{
        const {id, categoryName} = req.body;
        const result = await categoryService.update(id, categoryName);
        return res.status(200).json(result);
    }catch(error) {
        return res.status(500).json(error);
    }
}

const remvove = async (req, res) => {
    try{
        const id = req.query;
        const result = await categoryService.remove(id);
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json(error);
    }
}

export default {
    create,
    list,
    update,
    remvove
}