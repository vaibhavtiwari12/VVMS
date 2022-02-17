const { createDBConnection, closeConnection } = require("./mongoConnector");
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
      /* await closeConnection(); */
      return inventory;
    }
    case "Add": {
      //Adding data
      const data = await data.save();
      /* await closeConnection(); */
      return data;
    }
    case "FindByID": {
      const inventory = await Inventory.findById(data);
      /* await closeConnection(); */
      return inventory;
    }
    case "AddTransaction": {
      // Updating the data
      let fetchedInventory = await Inventory.findOne({
        itemName: data.itemName,
      });
      console.log("DATE ---- Receiver ---", data)
      fetchedInventory.transactions.push({
        kisanName: data.kisanName,
        kisanID: data.kisanId.toString(),
        numberofBags: data.numberofBags,
        totalweight: data.totalweight,
        purchaserId : data.purchaserId,
        purchaserName: data.purchaserName,
        rate: data.rate,
        date: new Date(),
      });
      fetchedInventory.totalWeight += data.totalweight;
      fetchedInventory.totalBags += data.numberofBags;
      console.log("Updated Inventory ", fetchedInventory);
      const finalInventory = await fetchedInventory.save();
      /* await closeConnection(); */
      return finalInventory;
    }
  }
  await closeConnection();
};
module.exports = { controller };
