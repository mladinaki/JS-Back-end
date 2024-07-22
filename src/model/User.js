const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minLength: 3,
    },
    lastName: {
        type: String,
        require: true,
        minLength: 3,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        minLength: 10,
    },
    password: {
        type: String,
        require: true,
        minLength: 4,
    },
})

UserSchema.virtual('repeatPassword').set(function (value) {
    if (value !== this.password) {
        throw new Error('Passwords do not match!');
    }
})

UserSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

UserSchema.path('email').validate(function (emailInput) {
    const userEmail = mongoose.model('User').findOne({ email: emailInput })
    return !!userEmail;
}, 'Email already exist')

const User = mongoose.model('User', UserSchema);
module.exports = User;