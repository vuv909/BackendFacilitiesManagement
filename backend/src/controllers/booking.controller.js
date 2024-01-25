import bookingService from "../services/booking.service.js";

const create = async (req, res) => {

    try {
        const result = await bookingService.create(req);
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            statusCode: 0,
            message: "System error"
        })
    }
}

const update = async (req, res) => {

    try {
        const result = await bookingService.update(req);
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            statusCode: 0,
            message: "System error"
        })
    }
}

const remove = async (req, res) => {

    try {
        const result = await bookingService.deleteOne(req);
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            statusCode: 0,
            message: "System error"
        })
    }

}

const detail = async (req, res) => {
    try {
        const result = await bookingService.detail(req);
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            statusCode: 0,
            message: "System error"
        })
    }

}

const listPagination = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5;
    const name = req.query.bookingName || '';
    const status = parseInt(req.query.status) || null;
    console.log("find all");
    try {
        const response = await bookingService.FindAll();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: error?.message || error,
        });
    }
}

export default {
    create,
    update,
    remove,
    detail,
    listPagination
}