import { userService } from "../services/index.js"


const login = async (req, res) => {
    const credentital = req.body.credential;
    try {
        const response = await userService.login(credentital);
        return res.status(200).json(response);
    } catch (error) {
        console.log("error", error.toString());
        return res.status(500).json({
            error: error?.message || error.toString(),
        });
    }
}
const FindOne = async (req, res) => {

    try {
        const response = await userService.FindOne(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: error?.message || error,
        });
    }
}
const UpdateOne = async (req, res) => {

    try {
        const response = await userService.FindOne(req);
        if (!response) {
            return res.status(404).json("User Not Found");
        }
        const num = await userService.UpdateOne(req);
        return res.status(200).json(num);
    } catch (error) {
        return res.status(500).json({
            message: error?.message || error,
        });
    }
}
const FindAll = async (req, res) => {

    try {
        const response = await userService.FindAll();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: error?.message || error, 
        });
    }
}

export default {
    login, FindOne, UpdateOne, FindAll
}