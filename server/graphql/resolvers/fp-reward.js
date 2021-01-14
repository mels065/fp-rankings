const FpReward = require('../../models/fp-reward');
const auth = require('../../utils/authentication');

const Query = {
    getFpRewards: async () => {
        try {
            return await FpReward.find({}).sort('-createdOn');
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
            createdOn: new Date().toISOString()
        });

        return fpReward;
    },
    
    deleteFpReward: async (_, { id }, context) => {
        const user = auth(context);

        try {
            const fpReward = await FpReward.findById(id);
            if (fpReward.creator == user.id) {
                fpReward.remove();
                return "FP Reward has been deleted";
            } else {
                return "You do not have the authorization to delete this FP Reward";
            }
        } catch (err) {
            throw err;
        }
    }
};

module.exports = { Query, Mutation };
