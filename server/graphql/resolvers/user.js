const User = require("../../models/user");

const Query = {
    getUsers: async () => {
        try {
            return await User.find({});
        } catch (err) {
            throw new Error(err);
        }
    },
    getUser: async (_, { id }) => {
        try {
            const user = await User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (err) {
            throw new Error(err);
        }
    }
};

const Mutation = {
    register: (registerInput) => {},
    login: (loginInput) => {}
};

module.exports = { Query, Mutation };
