const { MongooseError } = require('mongoose');

exports.errorMsg = (error) => {
    const instance = error instanceof MongooseError;
    if (instance) {
        const errors = Object.values(error.errors);
        const msg = errors.map(err => err.message);
        return msg;
    }
    return [error.message];
}