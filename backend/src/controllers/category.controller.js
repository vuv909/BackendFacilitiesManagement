import { categoryService, fileService } from "../services/index.js";

const create = async (req, res) => {
    const data = await fileService.uploadFile(req, "img", {
        categoryName: {
            isEmpty: false,
        }
    });
    try {
        const result = await categoryService.create(data);
        const statusCode = result.statusCode == 1 ? 201 : 500;
        return res.status(statusCode).json(result);
    } catch (error) {
        return res.status(500).json(error)
    }
}

const list = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5;
    const name = req.query.name || '';
    try {
        const result = await categoryService.list(page, size, name);
        const statusCode = result.statusCode == 1 ? 200 : 500;
        return res.status(statusCode).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const update = async (req, res) => {
    const data = await fileService.uploadFile(req, "img");
    try {
        const result = await categoryService.update(data);
        const statusCode = result.statusCode == 1 ? 200 : 500;
        return res.status(statusCode).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const remove = async (req, res) => {
    const {id} = req.query;
    try {
        const result = await categoryService.remove(id);
        const statusCode = result.statusCode == 1 ? 200 : 500;
        return res.status(statusCode).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export default {
    create,
    list,
    update,
    remove
}