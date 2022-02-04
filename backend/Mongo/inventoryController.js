const { createDBConnection } = require("./mongoConnector");
const Inventory = require("../Schema/inventorySchema");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const controller = async (type, data) => {
  //Creating MONGO Connection
  await createDBConnection();

  //All Operation in Mongo
  switch (type) {
    case "Get": {
      // Find Request
      const inventory = await Inventory.find();
      return inventory;
    }
    case "Add": {
      //Adding data
      return await data.save();
    }
    case "FindByID": {
      const inventory = await Inventory.findById(data);
      return inventory;
    }
    case "AddTransaction": {
      // Updating the data
      let fetchedInventory = await Inventory.findOne({
        itemName: data.itemName,
      });
      fetchedInventory.transactions.push({
        kisanName: data.kisanName,
        kisanID: data.kisanId.toString(),
        numberofBags: data.numberofBags,
        totalweight: data.totalweight,
        rate: data.rate,
        date: new Date(),
      });
      console.log("Updated Inventory ", fetchedInventory);
      const finalInventory = await fetchedInventory.save();
      return finalInventory;
    }
    /* case "editTransaction": {
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
    case "todaystransactions": {
      // Delete
      const allKisans = await Kisan.find();
      const transactions = getTransaction(
        allKisans,
        data.dateToSearch,
        "byDate"
      );
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
      return transactions;
    }
    case "transactionBetweenDates": {
      // Delete
      const allKisans = await Kisan.find();
      const transactions = getTransactionsBetweenDates(
        allKisans,
        data.startDate,
        data.endDate
      );
      return transactions;
    } */
  }
};
module.exports = { controller };
