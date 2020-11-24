const UserResolver = require('./user');
const User = require('../../models/user');

module.exports = {
    User: {
        fp: async (id) => 0,
        ranking: async (id) => 0
    },
    Query: {
        ...UserResolver.Query
    },
    Mutation: {
        ...UserResolver.Mutation
    }
}
