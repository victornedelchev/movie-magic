const {
  Schema,
  model,
  MongooseError
} = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required!'],
    lowercase: true,
    unique: true,
    match: [/^[a-zA-Z0-9]+@[A-Za-z0-9]+\.[a-z0-9]+$/g, 'Invalid email address!'],
    minLength: [5, 'Email should be at least 10 characters long!'],
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    match: [/^[a-zA-Z0-9]+$/, 'Password should consist only of English letters and digits'],
    minLength: [6, 'Password should be at least 6 characters long!'], 
  },
});

userSchema.pre('save', async function () {
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
});

userSchema.virtual('rePassword')
  .set(function (value) {
    // Validate
    if (value !== this.password) {
      throw new Error('Password mismatch!');
    }
  });

const User = model('User', userSchema);

module.exports = User;