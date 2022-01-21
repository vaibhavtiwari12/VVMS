const { createDBConnection } = require("./mongoConnector");
const Kisan = require("../Schema/kisanSchema");

/* IMPORTANT
    RDBMS       VS      MONGO
    Database            Database
    Table               Collections
    Rows                Documents
    Columns             Fields

*/
const controller = async (type, data) => {
  //Creating MONGO Connection
  await createDBConnection();

  //All Operation in Mongo
  switch (type) {
    case "Get": {
      // Find Request
      const posts = await Kisan.find();
      return posts;
    }
    case "Add": {
      //Adding data
      return await data.save();
    }
    case "FindByID": {
      console.log("IS Here", data);
      const kisan = await Kisan.findById(data);
      return kisan;
    }
    case "AddTransaction": {
      // Updating the data
      let updatekisan = await Kisan.findById(data.id);
      console.log("KISAN", updatekisan);
      updatekisan.transactions.push(data.transaction);
      updatekisan.balance += data.transaction.transactionAmount;
      console.log("Update Kisan", updatekisan);
      const updatedPost = await updatekisan.save();
      return updatedPost;
    }
    case "Delete": {
      // Delete
      const post = await Kisan.findById(data.id);
      const deletedData = await Kisan.deleteOne(post);
      return deletedData;
    }
  }
};
module.exports = { controller };
