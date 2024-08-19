const jwt = require('jsonwebtoken');
const usermodel = require("../models/User-model");

const authProtect = async (req,res,next) => {
    if (req.cookies.token) {
        try {
            const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            req.user = await usermodel.findOne({ email: data.email }).select("-password");
            next();
        } catch (error) {
            res.status(402).json({ msg: "Not authorized" });
        }
    } else {
        res.status(401).json({ msg: "Not authorized, you don't have any token" });
    }
}

module.exports = authProtect;