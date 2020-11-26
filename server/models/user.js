const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    createdOn: String,
    fpRewards: [{ type: Schema.Types.ObjectId, ref: 'fprewards' }]
});

module.exports = model('User', userSchema);
