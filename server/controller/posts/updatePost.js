import mongoose from "mongoose";
import postMessage from "../../database/models/postMessage.js";

const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const { creator, title, message, tags, selectedFile } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);
    
    const updatedPost = { _id, creator, title, message, tags, selectedFile };

    await postMessage.findByIdAndUpdate(_id, updatedPost, { new: true });

    res.json(updatedPost);

}

export default updatePost;