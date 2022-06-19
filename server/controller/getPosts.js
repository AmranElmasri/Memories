import postMessage from '../database/models/postMessage.js'

const getPosts = async (req, res) => {

    try {
       const result =  await postMessage.find();
       res.status(200).json(result)
       
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export default getPosts;