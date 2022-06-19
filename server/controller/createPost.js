import postMessage from '../database/models/postMessage.js';

const createPost = async (req, res) => {
    const post = req.body;
    const newPostMessage = new postMessage(post);
    try {
        await newPostMessage.save();
        res.status(200).json(newPostMessage);

    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
export default createPost; 