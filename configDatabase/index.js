const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('connect success to mongoDB')
    } catch (error) {
        handleError(error);
        console.log('connect faild:', error);
    }
}

module.exports = {connect};
