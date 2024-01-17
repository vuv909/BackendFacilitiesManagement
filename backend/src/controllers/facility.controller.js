import facilityService from "../services/facility.service.js";

const create = async (req, res) => {
    const facility = req.body;
    try{
        const result = await facilityService.create(facility);
        res.status(200).json(result);
    }catch(error){
        return res.status(500).json({
            statusCode: 0,
            message: "System error"
        })
    }
}

const update = async (req, res) => {
    const { name, category, image, status, location, description } = req.body;
}

const remove = async (req, res) => {
	const { facilityId } = req.query;
}

const detail = async (req, res) => {
	const { id } = req.params;
}

const listPagination = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5;
    const name = req.query.facilityName || '';
    const status = parseInt(req.query.status) || null;
}

export default {
    create,
    update,
    remove,
    detail,
    listPagination
}