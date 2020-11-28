const { model, Schema } = require("mongoose");

const fpRewardSchema = new Schema({
    reason: String,
    amount: Number,
    creator: { type: Schema.Types.ObjectId, ref: "users" },
    recipient: { type: Schema.Types.ObjectId, ref: "users" },
});

module.exports = model('FpReward', fpRewardSchema);
