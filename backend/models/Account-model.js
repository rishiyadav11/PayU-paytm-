const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
        validate: {
            validator: async function(v) {
                // Check if the userId exists in the User collection
                const User = mongoose.model('User');
                const user = await User.findById(v);
                return !!user;
            },
            message: 'User ID does not exist'
        }
    },
    balance: {
        type: Number,
        required: [true, 'Balance is required'],
        min: [0, 'Balance must be a positive number'],
        validate: {
            validator: Number.isFinite,
            message: 'Balance must be a number'
        }
    }
});

// Indexing the userId field for efficient querying
accountSchema.index({ userId: 1 });

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
