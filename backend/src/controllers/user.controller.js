import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
let DB = [];

const login = async (req, res) => {
    try {
        if (req.body.credential) {
            const verificationResponse = await verifyGoogleToken(req.body.credential);
            if (verificationResponse.error) {
                return res.status(400).json({
                    message: verificationResponse.error,
                });
            }

            const profile = verificationResponse?.payload;

            const existsInDB = DB.find((person) => person?.email === profile?.email);

            if (!existsInDB) {
                // return res.status(400).json({
                //     message: "You are not registered. Please sign up",
                // });
            }

            return res.status(201).json({
                message: "Login was successful",
                user: {
                    firstName: profile?.given_name,
                    lastName: profile?.family_name,
                    picture: profile?.picture,
                    email: profile?.email,
                    token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
                        expiresIn: "1d",
                    }),
                },
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error?.message || error,
        });
    }
}

async function verifyGoogleToken(token) {
    try {
        console.log(token);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        console.log(ticket);
        return { payload: ticket.getPayload() };
    } catch (error) {
        console.log(error.toString());
        return { error: "Invalid user detected. Please try again" };
    }
}

export default {
    login
}