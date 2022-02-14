const mongoose = require("mongoose");

const createDBConnection = async () =>  {
    return await mongoose.connect(`${process.env.MONGO_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}
module.exports = {createDBConnection};