import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken'
import UserModal from '../../database/models/user.js';
import dotenv from 'dotenv';

dotenv.config();


const signin = async (req, res) => {
    const secret = process.env.SECRET_KEY;

    const { email, password } = req.body;
    
    try {
        const oldUser = await UserModal.findOne({ email });

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ result: oldUser, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export default signin;