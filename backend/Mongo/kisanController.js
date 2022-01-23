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
      updatekisan.transactions.push(data.transaction);
      if (data.transaction.type === "DEBIT") {
        updatekisan.balance += data.transaction.transactionAmount;
      } else {
        updatekisan.balance += parseInt(data.transaction.advanceSettlement);
        updatekisan.carryForwardAmount =
          data.transaction.carryForwardFromThisEntry;
      }
      const finalKisan = await updatekisan.save();
      return finalKisan;
    }
    case "editTransaction": {
      // Delete
      const kisanToUpdate = await Kisan.findById(data.id);
      const newKisanTransaction = kisanToUpdate.transactions.map((trans) => {
        if (trans._id == data.transactionNumber) {
          return { ...trans, comment: data.comment };
        } else return trans;
      });
      console.log("newKisanTransaction", newKisanTransaction);
      kisanToUpdate.transactions = newKisanTransaction;
      console.log("kisanToUpdate", kisanToUpdate);
      const finalKisan = await kisanToUpdate.save();
      return finalKisan;
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
