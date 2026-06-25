const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    // Check if token exists in Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        try {

            // Extract token
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // Get user details except password
            req.user = await User.findById(decoded.id).select("-password");

            next();

        } catch (error) {

            return res.status(401).json({
                message: "Not authorized. Invalid token."
            });

        }
    }

    if (!token) {
        return res.status(401).json({
            message: "Not authorized. No token provided."
        });
    }
};

module.exports = { protect };