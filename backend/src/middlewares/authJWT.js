import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
	let token = req.headers["x-access-token"];
	if (!token) {
		return res.status(403).send({ message: "No token provide!" });
	}

	const jwtSecret = process.env.JWT_SECRET;
	jwt.verify(token,
		jwtSecret,
		(error, decoded) => {
			if (error) {
				return res.status(401).send({
					message: error
				})
			}
			req.userID = decoded.id;
			next();
		})
}

export default {
    verifyToken
}