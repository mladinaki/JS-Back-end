const mongoose = require('mongoose');

const creatureSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 2,
    },
    species: {
        type: String,
        require: true,
        minLength: 3,
    },
    skinColor: {
        type: String,
        require: true,
        minLength: 3,
    },
    eyeColor: {
        type: String,
        require: true,
        minLength: 3,
    },
    image: {
        type: String,
        require: true,
        required: true
    },
    description: {
        type: String,
        require: true,
        minLength: 5,
    },
    votes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
})

const Cretaure = mongoose.model('Cretaure', creatureSchema);

module.exports = Cretaure;