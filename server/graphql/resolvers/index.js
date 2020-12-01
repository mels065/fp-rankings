const ObjectID = require('mongoose').Types.ObjectId;

const UserResolver = require('./user');
const FpRewardResolver = require('./fp-reward');
const User = require('../../models/user');
const FpReward = require('../../models/fp-reward');

const getFp = async (id) => (await FpReward.find({ recipient: id })).reduce(
    (sum, fpReward) => sum + fpReward.amount, 0
);

module.exports = {
    User: {
        fpRewards: async({ id }) => await FpReward.find({ recipient: id }),
        fp: async ({ id }) => await getFp(id),
        ranking: async ({ id }) => {
            const users = (await User.find({})).sort(async (user1, user2) => (
                getFp(user2) - getFp(user1)
            ));
            const rank = users.findIndex(user => user.id === id) + 1;
            if (rank > 0) return rank
            else return -1;
        }
    },

    FpReward: {
        creator: async ({ creator: creatorId }) => await User.findById(creatorId),
        recipient: async ({ recipient: recipientId }) => await User.findById(recipientId),
    },

    Query: {
        ...UserResolver.Query,
        ...FpRewardResolver.Query,
    },
    Mutation: {
        ...UserResolver.Mutation,
        ...FpRewardResolver.Mutation,
    }
}
