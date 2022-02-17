const { createDBConnection, closeConnection } = require("./mongoConnector");
const Kisan = require("../Schema/kisanSchema");
const InventoryController = require("../Mongo/inventoryController");
const Inventory = require("../Schema/inventorySchema");
const {
  getTransactionsBetweenDates,
  getTransaction,
} = require("../Utilities/utility");

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
      closeConnection();
      return posts;
    }
    case "Add": {
      //Adding data
      const data = await data.save();
      closeConnection();
      return data
    }
    case "FindByID": {
      console.log("IS Here", data);
      const kisan = await Kisan.findById(data);
      closeConnection();
      return kisan;
    }
    case "AddTransaction": {
      // Updating the data
      let updatekisan = await Kisan.findById(data.id);
      updatekisan.transactions.push(data.transaction);
      if (
        data.transaction.type === "DEBIT" ||
        data.transaction.type === "ADVANCESETTLEMENT"
      ) {
        updatekisan.balance += data.transaction.transactionAmount;
      } else {
        if(data.transaction.purchaserId && data.transaction.itemType!==""){
          await InventoryController.controller("AddTransaction", {
            itemName: data.transaction.itemType,
            kisanName: updatekisan.name,
            kisanId: updatekisan._id,
            numberofBags: data.transaction.numberofBags,
            totalweight: data.transaction.totalweight,
            rate: data.transaction.rate,
            purchaserId : data.transaction.purchaserId,
            purchaserName: data.transaction.purchaserName
          });
        }
        updatekisan.balance += parseInt(data.transaction.advanceSettlement);
        updatekisan.carryForwardAmount =
          data.transaction.carryForwardFromThisEntry;
      }
      const finalKisan = await updatekisan.save();
      closeConnection();
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
      closeConnection();
      return finalKisan;
    }
    case "todaystransactions": {
      // Delete
      const allKisans = await Kisan.find();
      const transactions = getTransaction(
        allKisans,
        data.dateToSearch,
        "byDate"
      );
      closeConnection();
      return transactions;
    }
    case "monthTransaction": {
      // Delete
      const allKisans = await Kisan.find();
      const transactions = getTransaction(
        allKisans,
        data.monthToSearch,
        "byMonth"
      );
      closeConnection();
      return transactions;
    }
    case "transactionBetweenDates": {
      // Delete
      const allKisans = await Kisan.find();
      const transactions = getTransactionsBetweenDates(
        allKisans,
        data.startDate,
        data.endDate,
        data.type
      );
      closeConnection();
      return transactions;
    }
  }
};
module.exports = { controller };
