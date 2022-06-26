import mongoose from 'mongoose';
import postMessage from "../../database/models/postMessage.js";

const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userInformation) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await postMessage.findById(id);

    const index = post.likes.indexOf((id) => id === String(req.userInformation.id));

    if (index === -1) {
        post.likes.push(req.userInformation.id);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userInformation.id))
    }

    const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}

export default likePost;
