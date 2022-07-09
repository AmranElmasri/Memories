import postMessage from '../../database/models/postMessage.js';

const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await postMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

        res.json({data: posts});
    } catch (error) {
        res.status(404).json({message: error.message});
    }

};

export default getPostsBySearch;
