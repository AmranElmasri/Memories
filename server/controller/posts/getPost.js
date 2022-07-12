import postMessage from '../../database/models/postMessage.js'


const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postMessage.findById(id);
        res.status(200).json(post)

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default getPost;