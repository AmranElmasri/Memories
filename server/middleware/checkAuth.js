import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const checkAuth = async (req, res, next) => {
    const secret = process.env.SECRET_KEY;

    try {
        const { token } = req.cookies;
        if (!token) res.status(401).json({ message: 'Access denied' });

        const decoded = jwt.verify(token, secret);
        req.userInformation = decoded;

        next();
    } catch (error) {
        console.log(error);
    }

};

export default checkAuth;