const ObjectID = require('mongoose').Types.ObjectId;

const UserResolver = require('./user');
const User = require('../../models/user');
const FpReward = require('../../models/fp-reward');

module.exports = {
    User: {
        fp: async ({ id }) => {
            console.log(await FpReward.find({ recipient: new ObjectID(id) }));
            return (await FpReward.find({ recipient: id })).reduce(
                (sum, fpReward) => sum + fpReward.amount, 0
            );
        },
        ranking: async (id) => 0
    },
    Query: {
        ...UserResolver.Query
    },
    Mutation: {
        ...UserResolver.Mutation
    }
}
