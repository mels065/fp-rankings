const FpReward = require('../../models/fp-reward');

const Query = {
    getFpRewards: async () => {
        try {
            return await FpReward.find({});
        } catch (err) {
            throw new Error(err);
        }
    },
    getFpReward: async (_, { id }) => {
        try {
            return await FpReward.findById(id);
        } catch (err) {
            throw new Error(err);
        }
    },
};

const Mutation = {};

module.exports = { Query, Mutation };
