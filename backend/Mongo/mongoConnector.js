const mongoose = require("mongoose");

const createDBConnection = async () =>  {
    return await mongoose.connect(`mongodb://${process.env.MONGO_URL}/VVMS`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}
module.exports = {createDBConnection};