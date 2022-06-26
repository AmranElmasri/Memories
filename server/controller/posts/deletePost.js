import mongoose from 'mongoose';
import postMessage from '../../database/models/postMessage.js';

const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await postMessage.findByIdAndRemove(id);

    res.status(200).json({message: 'post deleted successfully.'})
}
export default deletePost;
