import { validationResult } from "express-validator";
import facilityService from "../services/facility.service.js";
import fileService from "../services/file.service.js";

const create = async (req, res) => {
    const data = req.body;
    try{
        const imageResult = await fileService.uploadFile(data);
        const result = await facilityService.create(data, imageResult);
        const statusCode = result.statusCode == 1 ? 200 : 500;
        return res.status(statusCode).json(result);
    }catch(error){
        return res.status(500).json(error)
    }
}

const update = async (req, res) => {
    const data = req.body;
    try{
        const imageResult = await fileService.uploadFile(data);
        const result = await facilityService.update(data, imageResult);
        const statusCode = result.statusCode == 1 ? 200 : 500;
        return res.status(statusCode).json(result);
    }catch(error){
        return res.status(500).json(error)
    }
}

const remove = async (req, res) => {
	const { id } = req.query;
    try{
        const result = await facilityService.remove(id);
        const statusCode = result.statusCode == 1 ? 200 : 500;
        return res.status(statusCode).json(result);
    }catch(error){
        return res.status(500).json(error);
    }
}

const detail = async (req, res) => {
	const { id } = req.params;
    try{
        const result = await facilityService.detail(id);
        const statusCode = result.statusCode == 1 ? 200 : 500;
        return res.status(statusCode).json(result);
    }catch(error){
        return res.status(500).json(error);
    }
}

const listPagination = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5;
    const name = req.query.name || '';
    try{
        const result = await facilityService.listPagination(page, size, name);
        const statusCode = result.statusCode == 1 ? 200 : 500;
        return res.status(statusCode).json(result);
    }catch(error){
        return res.status(500).json(error);
    }
}

export default {
    create,
    update,
    remove,
    detail,
    listPagination
}