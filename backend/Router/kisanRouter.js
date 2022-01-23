const express = require("express");
const { controller } = require("../Mongo/kisanController");
const Kisan = require("../Schema/kisanSchema");
const mongoose = require("mongoose");

const KisanRouter = express.Router();

KisanRouter.get("/get", async (req, res) => {
  const allKisan = await controller("Get");
  res.json(allKisan);
});

KisanRouter.get("/getByID/:id", async (req, res) => {
  console.log("Request Params", req.params.id);
  const allKisan = await controller("FindByID", req.params.id);
  res.json(allKisan);
});

KisanRouter.post("/add", async (req, res) => {
  console.log("IS here", req.body);
  const newkisan = new Kisan({
    name: req.body.name,
    fatherName: req.body.fatherName,
    phone: req.body.phone,
    address: req.body.address,
    date: new Date().toString(),
    balance: 0,
    carryForwardAmount: 0,
    transactions: [],
  });
  const addedKisan = await controller("Add", newkisan);
  res.json(addedKisan);
});

KisanRouter.post("/AddTransaction/:id", async (req, res) => {
  var id = mongoose.Types.ObjectId();
  const addedTransaction = await controller("AddTransaction", {
    id: req.params.id,
    transaction: { ...req.body.transaction, date: new Date(), _id: id },
  });
  res.json(addedTransaction);
});

KisanRouter.post("/editTransaction/:id", async (req, res) => {
  const editedTransaction = await controller("editTransaction", {
    id: req.params.id,
    transactionNumber: req.body.transactionNumber,
    comment: req.body.comment,
  });
  res.json(editedTransaction);
});

/*KisanRouter.get("/delete/:id",async (req,res) => {
    console.log("Reaching Router");
    const deletedPost = await controller('Delete', {id: req.params.id});
    res.json(deletedPost);
});
 */
module.exports = KisanRouter;
