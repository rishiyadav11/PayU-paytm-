const mongoose = require('mongoose');
const { Schema } = mongoose; // Import Schema from mongoose

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  account: [{ // Changed to 'accounts' for convention
    type: Schema.Types.ObjectId,
    ref: 'Account' // Reference to Account model
  }],
  password: { type: String, required: true, minlength: 8 }, // Use 'minlength' instead of 'minLength'
  bgcolor: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
