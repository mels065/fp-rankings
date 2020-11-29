const FpReward = require('../../models/fp-reward');
const auth = require('../../utils/authentication');

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

const Mutation = {
    createFpReward: async (
        _,
        {
            recipient,
            reason,
            amount
        },
        context,
    ) => {
        const user = auth(context);

        const fpReward = await FpReward.create({
            creator: user.id,
            recipient,
            reason,
            amount,
            createdAt: new Date().toISOString()
        });

        return fpReward;
    },
};

module.exports = { Query, Mutation };
