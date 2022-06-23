import mongoose from "mongoose";
import postMessage from "../database/models/postMessage.js";

const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const { creator, title, message, tags, selectedFile } = req.body;
    const updatePost = { _id, creator, title, message, tags, selectedFile };

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);
    
    const updatedPost = await postMessage.findByIdAndUpdate(_id, updatePost, { new: true });

    res.status(200).json(updatedPost);

}

export default updatePost;