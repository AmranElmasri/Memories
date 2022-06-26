import mongoose from 'mongoose';
import postMessage from '../database/models/postMessage.js';

const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await postMessage.findById(id);
    
    const updatedPost = await postMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, {new: true});
    
    res.json(updatedPost);
}   

export default likePost;
