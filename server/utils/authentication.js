const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");

module.exports = function (context) {
    const { req } = context;
    const auth = req.headers.authorization;

    if (!auth) {
        throw new Error("Authentication header must be present");
    }

    const token = auth.split("Token ")[1];

    if (!token) {
        throw new Error("Token must match `Token [token]`");
    }

    try {
        const userId = jwt.verify(token, JWT_SECRET);
        return userId;
    } catch(err) {
        throw new AuthenticationError("Invalid or expired token");
    }
}
