const UserResolver = require('./user');

module.exports = {
    Query: {
        ...UserResolver.Query
    },
    Mutation: {
        ...UserResolver.Mutation
    }
}
