import postMessage from "../../database/models/postMessage.js";


const commentPost = async (req, res) => {
    const { id } = req.params;
    const { finalComment } = req.body;

        const post = await postMessage.findById(id);

        post.comments.push(finalComment);

        const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true });
        res.json(updatedPost);

}

export default commentPost;