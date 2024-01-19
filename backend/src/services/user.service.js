import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import { userRepository } from '../repositories/index.js';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const login = async (credential) => {
    try {
        if (credential) {
            const verificationResponse = await verifyGoogleToken(credential);
            if (verificationResponse.error) {
                return res.status(400).json({
                    message: verificationResponse.error,
                });
            }

            const profile = verificationResponse?.payload;
            if(!isEmailInDomain(profile?.email, 'fpt.edu.vn')){
                return {
                    message: "Only FPT University people can login to this system"
                }
            }
            userRepository.checkUserInDB(profile);
            return {
                message: "Login was successful",
                user: {
                    token: jwt.sign({
                        email: profile?.email,
                        name: profile?.name,
                        avatar: profile?.picture
                    },
                        process.env.JWT_SECRET, {
                        expiresIn: "1d",
                    }),
                },
            };
        }
    } catch (error) {
        return {
            message: "Error",
            content: error.toString()
        }
    }
}

// Tìm chi tiết User profile 
const FindOne = async (req) => {
    const { id } = req.params;

    try {
        if (id) {
            let user = await userRepository.findUser(id);
            return user;
        }
    } catch (error) {
        return {
            message: "Error",
            content: error.toString()
        }
    }
}
// cập nhật user profile 

const UpdateOne = async (req) => {
    const user = await FindOne(req);
    try {
        if (user) {
            let user = await userRepository.UpdateOne(req);
            return user;
        }
    } catch (error) {
        return {
            message: "Error",
            content: error.toString()
        }
    }
}
const FindAll = async (req) => {
    try {
        let user = await userRepository.FindAll(req);
        console.log("hello user ");
        return user;
    } catch (error) {
        return {
            message: "Error",
            content: error.toString()
        }
    }
}

async function verifyGoogleToken(token) {
    try {
        console.log(token);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        return { payload: ticket.getPayload() };
    } catch (error) {
        console.log(error.toString());
        return { error: "Invalid user detected. Please try again" };
    }
}

const isEmailInDomain = (email, domain) => {
	const regex = new RegExp(`@${domain}$`, 'i'); // Case-insensitive regex for the domain
	return regex.test(email);
}


export default {
    login, FindOne, UpdateOne, FindAll
}