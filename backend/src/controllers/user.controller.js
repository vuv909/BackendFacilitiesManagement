import { userService } from "../services/index.js"


const login = async (req, res) => {
    const credentital = req.body.credential;
    try{
        const response = await userService.login(credentital);
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).json({
            message: error?.message || error, 
        });
    }
}

export default {
    login
}