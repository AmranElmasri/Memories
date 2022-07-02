export default (req, res) => {
    res.clearCookie('token').json({message: 'Logged Out Successfully'})
};