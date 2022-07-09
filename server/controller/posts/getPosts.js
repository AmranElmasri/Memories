import postMessage from '../../database/models/postMessage.js'

const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await postMessage.countDocuments({}); // get the total number of posts
        const posts = await postMessage.find().sort({ createdAt: -1 }).skip(startIndex).limit(LIMIT);
        const totalPages = Math.ceil(total / LIMIT);

        res.status(200).json({
            posts,
            totalPages,
            currentPage: Number(page)
        });

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export default getPosts;

/* .sort({ _id: -1 }); // get the posts in descending order from newest to oldest
 or 
 .sort({ createdAt: -1 }) 
 */