import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken'
import UserModal from '../../database/models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const signup = async () => {
    const secret = process.env.SECRET_KEY;

    const { email, password, firstName, lastName } = req.body;

    try {
        const oldUser = UserModal.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await hash(password, 12);

        const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

        res.cookie('token', token, { httpOnly: true });

        res.status(201).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export default signup;