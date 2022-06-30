import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken'
import UserModal from '../../database/models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const signup = async (req, res) => {
    const secret = process.env.SECRET_KEY;

    const { email, password, firstName, lastName } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await hash(password, 12);

        const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id, name: result.name }, secret, { expiresIn: "30d" });

        res.status(201).cookie('token', token).json({ result, token });


    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export default signup;