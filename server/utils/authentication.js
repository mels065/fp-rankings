const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");

module.exports = function (context) {
    const { req } = context;
    const auth = req.heders.authorization;

    if (!auth) {
        throw new Error("Authentication token must be present");
    }

    const token = auth.split("Token ")[1];

    if (!token) {
        throw new Error("Token must match `Token [token]`");
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        return user;
    } catch(err) {
        throw new AuthenticationError("Invalid or expired token");
    }
}
